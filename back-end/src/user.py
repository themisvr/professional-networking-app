from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response, make_response_error, commit_db_session_and_return_successful_response, \
    commit_db_session_or_return_error_response, get_user_with_email_or_return_error
from db import User, db, UserSchema, PostSchema, PersonalInfoSchema, NetworkSchema, JobPostSchema

bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route("", methods=["GET"])
def get_users():
    if request.args.get("email"):
        user, err = get_user_with_email_or_return_error(request.args.get("email"))

        if user:
            return make_response(user)
        else:
            return err

    users = User.query.all()
    return make_response(UserSchema().dumps(users, many=True))


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

    return make_response(PostSchema().dumps(user.posts, many=True))


@bp.route("/posts", methods=["POST"])
def create_user_post():
    content = request.get_json()

    user, err = get_user_with_email_or_return_error(content.get("email"))

    if not user:
        return err

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

    jobPosts = []
    for connectedUser in user.connections:
        jobPosts.extend(connectedUser.jobPosts)

    jobPosts = list(set(jobPosts) - set(user.jobApplications))
    return make_response(JobPostSchema().dumps(jobPosts, many=True))


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
    user, err = get_user_with_email_or_return_error(request.args.get("email"))

    if not user:
        return err

    content = request.get_json()
    schema = JobPostSchema()
    job_post = schema.load(content, session=db.session)
    user.jobPosts.append(job_post)
    commit_db_session_and_return_successful_response(db, schema, job_post)
