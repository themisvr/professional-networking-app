import io

from flask import Blueprint, request, send_file
from article_recommender import *
import numpy as np
from http_constants.status import HttpStatus
from utils import make_response, make_response_error, commit_db_session_and_return_successful_response, \
    commit_db_session_or_return_error_response, get_user_with_email_or_return_error, get_user_with_id_or_return_error
from db import User, db, UserSchema, PostSchema, PersonalInfoSchema, NetworkSchema, JobPostSchema, user_connections, \
    Post, PostLike, pending_connections, JobPost

bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route("", methods=["GET"])
def get_users():
    if request.args.get("email"):
        user, err = get_user_with_email_or_return_error(request.args.get("email"))

        if user:
            return make_response(user)
        else:
            return err

    users = User.query.filter_by(isAdmin=False).all()
    return make_response(UserSchema().dumps(users, many=True))


@bp.route("/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user, err = get_user_with_id_or_return_error(user_id)

    if not user:
        return err

    return make_response(UserSchema().dumps(user))


@bp.route("/<user_id>/avatar", methods=["POST", "PUT"])
def upload_avatar(user_id):
    user, err = get_user_with_id_or_return_error(user_id)

    if not user:
        return err

    if not request.files:
        return make_response_error("No image was sent for upload", HttpStatus.BAD_REQUEST)

    avatar = next(request.files.values(), None)
    if not avatar:
        return make_response_error("No image was sent for upload", HttpStatus.BAD_REQUEST)

    user.avatarMimeType = avatar.mimetype
    user.avatar = avatar.read()

    return commit_db_session_and_return_successful_response(db, UserSchema(), user)


@bp.route("/<user_id>/avatar", methods=["GET"])
def get_user_avatar(user_id):
    user, err = get_user_with_id_or_return_error(user_id)

    if not user:
        return err

    if user.avatar:
        return send_file(io.BytesIO(user.avatar), mimetype=user.avatarMimeType)

    return b''


@bp.route("/changeEmail", methods=['PUT'])
def change_email():
    content = request.get_json()
    user, err = get_user_with_email_or_return_error(content.get("email"))

    if not user:
        return err

    new_email = content.get("newEmail")
    if not new_email:
        return make_response_error("No email provided", HttpStatus.BAD_REQUEST)

    password = content.get("password")
    if not password:
        return make_response_error("No password provided", HttpStatus.BAD_REQUEST)

    if not user.passwords_match(password):
        return make_response_error("Wrong password", HttpStatus.UNAUTHORIZED)

    if User.query.filter_by(email=new_email).first():
        return make_response_error(f"User with email {new_email} already exists", HttpStatus.CONFLICT)

    user.email = new_email
    return commit_db_session_and_return_successful_response(db, UserSchema(), user)


@bp.route("/changePassword", methods=['PUT'])
def change_password():
    content = request.get_json()
    user, err = get_user_with_email_or_return_error(content.get("email"))

    if not user:
        return err

    old_password = content.get("oldPassword")
    if not user.passwords_match(old_password):
        return make_response_error("Wrong password", HttpStatus.UNAUTHORIZED)

    new_password = content.get("newPassword")
    if not new_password:
        return make_response_error("No new password provided", HttpStatus.BAD_REQUEST)

    user.password = new_password
    return commit_db_session_and_return_successful_response(db, UserSchema(), user)


@bp.route("/posts", methods=["GET"])
def get_user_posts():
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    limit = 20

    user_models = [user for user in User.query.all() if user.isAdmin == False]
    user_ids = [user.userId for user in user_models]
    article_posts_ids = [post.postId for post in Post.query.all()]

    users_mapping = {v: k for k, v in enumerate(user_ids)}
    articles_mapping = {v: k for k, v in enumerate(article_posts_ids)}

    user_posts = Post.query.join(User, Post.userId == user.userId).limit(limit).all()
    all_posts = Post.query.limit(limit).all()

    X = np.zeros((len(user_models), len(article_posts_ids)))

    for user in user_models:
        for likedPost in user.likedPosts:
            X[users_mapping[user.userId]][articles_mapping[likedPost.postId]] += 1
        for postComment in user.postComments:
            X[users_mapping[user.userId]][articles_mapping[postComment.postId]] += 1

    latent_semantic_model = MatrixFactorization(X, K=2, h=0.001)
    latent_semantic_model.train_model()
    values_predicted = latent_semantic_model.X_predicted()

    max_of_each_col = list(np.max(values_predicted, axis=0))
    k = 5
    k_max_indexes = []
    for i in range(k):
        max_index = max_of_each_col.index(max(max_of_each_col))
        k_max_indexes.append(max_index + 1)

    articlesToShow = [article for article in all_posts if article.postId in k_max_indexes]
    articlesToShow.extend(user_posts)
    articlesToShow = list(set(articlesToShow))

    articlesToShow.sort(reverse=True, key=lambda x: x.updated)

    return make_response(PostSchema().dumps(articlesToShow, many=True))


@bp.route("/posts", methods=["POST"])
def create_user_post():
    content = request.get_json()

    user_id = content.get("userId")
    if not user_id:
        return make_response_error(f"User id of post creator was not specified", HttpStatus.BAD_REQUEST)

    user = User.query.filter_by(userId=user_id).first()

    if not user:
        return make_response_error(f"User with id {user_id} was not found", HttpStatus.NOT_FOUND)

    schema = PostSchema()
    post = schema.load(content, session=db.session)
    user.posts.append(post)

    return commit_db_session_and_return_successful_response(db, schema, post)


@bp.route("/personalInfo", methods=["GET"])
def get_user_personal_info():
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    return make_response(PersonalInfoSchema().dumps(user.personalInfo))


@bp.route("/personalInfo", methods=["POST"])
def update_user_personal_info():
    content = request.get_json()

    user, err = get_user_with_email_or_return_error(content.get("email"))

    if not user:
        return err

    schema = PersonalInfoSchema()
    user.personalInfo = schema.load(content, instance=user.personalInfo, session=db.session)

    db_err = commit_db_session_or_return_error_response(db)

    if db_err:
        return db_err

    return make_response(PersonalInfoSchema().dumps(user.personalInfo))


@bp.route("/network", methods=["GET"])
def get_user_network():
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    return make_response(NetworkSchema().dumps(user.connections, many=True))


@bp.route("/availableJobs", methods=["GET"])
def get_available_job_posts():
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    jobsToShow = []
    connJobPosts = []
    for connectedUser in user.connections:
        connJobPosts.extend(connectedUser.jobPosts)

    allJobPosts = [job.jobPostId for job in JobPost.query.all()]
    createdJobPosts = [job.jobPostId for job in user.jobPosts]
    connectedjobPosts = [job.jobPostId for job in connJobPosts]
    userjobApplications = [userAppls.jobPostId for userAppls in user.jobApplications]
    connectedjobPosts = list(set(connectedjobPosts) - set(userjobApplications))
    notConnectedJobPosts = list(set(allJobPosts) - set(connectedjobPosts) - set(createdJobPosts))
    jobModels = JobPost.query.all()
    notConnectedJobPostsModels = list(set(jobModels) - set(connJobPosts) - set(user.jobPosts))

    jobsToShow.extend(connJobPosts)

    if (not notConnectedJobPosts):
        return make_response(JobPostSchema().dumps(jobsToShow, many=True))

    user_ids = [user.userId for user in User.query.all() if user.isAdmin == False]

    user_mapping = {v: k for k, v in enumerate(user_ids)}
    job_mapping = {v: k for k, v in enumerate(notConnectedJobPosts)}

    X = np.zeros((len(user_ids), len(notConnectedJobPosts)))
    for job_id in notConnectedJobPosts:
        for job in jobModels:
            if (job.jobPostId == job_id):
                applicants_ids = [user.userId for user in job.jobApplicants]
                for applicant in applicants_ids:
                    X[user_mapping[applicant]][job_mapping[job_id]] += 1

    latent_semantic_model = MatrixFactorization(X, K=2, h=0.001)
    latent_semantic_model.train_model()
    values_predicted = latent_semantic_model.X_predicted()

    max_of_each_col = list(np.max(values_predicted, axis=0))
    k = 5
    k_max_indexes = []
    for i in range(k):
        max_index = max_of_each_col.index(max(max_of_each_col))
        k_max_indexes.append(max_index + 1)

    jobsToShow = [job for job in notConnectedJobPostsModels if job_mapping[job.jobPostId] in k_max_indexes]
    jobsToShow.extend(connectedjobPosts)

    return make_response(JobPostSchema().dumps(jobsToShow, many=True))


@bp.route("/appliedJobs", methods=["GET"])
def get_user_applied_jobs():
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    return make_response(JobPostSchema().dumps(user.jobApplications, many=True))


@bp.route("/createdJobs", methods=["GET"])
def get_user_created_jobs():
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    return make_response(JobPostSchema().dumps(user.jobPosts, many=True))


@bp.route("/createJobPost", methods=["POST"])
def create_job_post():
    content = request.get_json()
    user, err = get_user_with_id_or_return_error(content["posterId"])

    if not user:
        return err

    content = request.get_json()
    schema = JobPostSchema()
    job_post = schema.load(content, session=db.session)
    user.jobPosts.append(job_post)
    return commit_db_session_and_return_successful_response(db, schema, job_post)


def get_pending_connection(lhs_user_id, rhs_user_id):
    stmt = pending_connections.select().filter(pending_connections.c.user_id == lhs_user_id,
                                               pending_connections.c.applied_user_id == rhs_user_id)
    return next(db.session.execute(stmt), None)


def delete_pending_connection(lhs_user_id, rhs_user_id):
    stmt = pending_connections.delete().where(pending_connections.c.user_id == lhs_user_id,
                                              pending_connections.c.applied_user_id == rhs_user_id)
    db.session.execute(stmt)


@bp.route("/<user_id>/pendingConnections", methods=["GET"])
def get_pending_user_connections(user_id):
    user, err = get_user_with_id_or_return_error(user_id)

    if not user:
        return err

    pending = User.query.join(pending_connections, pending_connections.c.user_id == User.userId).filter(
        pending_connections.c.applied_user_id == user.userId).all()

    return make_response(UserSchema().dumps(pending, many=True))


@bp.route("/<rejector_id>/rejectConnection", methods=["POST"])
def reject_user_connection(rejector_id):
    user, err = get_user_with_id_or_return_error(rejector_id)

    if not user:
        return err

    content = request.get_json()
    user_id = content.get("userId")

    if not user_id:
        return make_response_error("No user id was provided for user to reject", HttpStatus.BAD_REQUEST)

    if not User.query.filter_by(userId=user_id).first():
        return make_response_error(f"Trying to reject user with id {user_id} who does not exist", HttpStatus.NOT_FOUND)

    if not get_pending_connection(user_id, rejector_id):
        return make_response_error(
            f"No pending connection was found between users with ids {rejector_id} and {user_id}", HttpStatus.NOT_FOUND)

    delete_pending_connection(user_id, rejector_id)
    err = commit_db_session_or_return_error_response(db)
    return "OK", 200 if not err else err


@bp.route("/<acceptor_id>/acceptConnection", methods=["POST"])
def accept_user_connection(acceptor_id):
    user, err = get_user_with_id_or_return_error(acceptor_id)

    if not user:
        return err

    content = request.get_json()
    user_id = content.get("userId")

    if not user_id:
        return make_response_error("No user id was provided for user to accept", HttpStatus.BAD_REQUEST)

    target_user = User.query.filter_by(userId=user_id).first()
    if not target_user:
        return make_response_error(f"Trying to accept user with id {user_id} who does not exist", HttpStatus.NOT_FOUND)

    if not get_pending_connection(user_id, acceptor_id):
        return make_response_error(
            f"No pending connection was found between users with ids {acceptor_id} and {user_id}", HttpStatus.NOT_FOUND)

    delete_pending_connection(user_id, acceptor_id)

    user.connections.append(target_user)
    target_user.connections.append(user)

    err = commit_db_session_or_return_error_response(db)
    return "OK", 200 if not err else err


@bp.route("/<connector_id>/connect", methods=["POST"])
def user_connection_request(connector_id):
    user, err = get_user_with_id_or_return_error(connector_id)

    if not user:
        return err

    content = request.get_json()
    user_id = content.get("userId")

    if not user_id:
        return make_response_error("No user id was provided for user to connect", HttpStatus.BAD_REQUEST)

    if not User.query.filter_by(userId=user_id):
        return make_response_error(f"Trying to connect with user with id {user_id} who does not exist",
                                   HttpStatus.NOT_FOUND)

    ins = pending_connections.insert().values(user_id=connector_id, applied_user_id=user_id)
    try:
        db.session.execute(ins)
    except Exception as e:
        print(e)
        return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

    err = commit_db_session_or_return_error_response(db)
    return "Created", 204 if not err else err
