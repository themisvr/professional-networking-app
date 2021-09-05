from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response_error, commit_db_session_and_return_successful_response, \
    get_user_with_email_or_return_error, make_response
from db import db, JobPost, JobPostSchema, UserSchema

bp = Blueprint("jobPosts", __name__, url_prefix="/jobPosts")


@bp.route("/<job_post_id>/apply", methods=["POST"])
def update_post(job_post_id):
    content = request.get_json()
    user, err = get_user_with_email_or_return_error(content["email"])

    if not user:
        return err

    job_post = JobPost.query.filter_by(jobPostId=job_post_id).first()

    if not job_post:
        return make_response_error(f"Post with id {job_post_id} not found", HttpStatus.NOT_FOUND)

    user.jobApplications.append(job_post)
    return commit_db_session_and_return_successful_response(db, JobPostSchema(), job_post)


@bp.route("/<job_post_id>/applicants", methods=["GET"])
def get_job_post_applicants(job_post_id):
    job_post = JobPost.query.filter_by(jobPostId=job_post_id).first()

    if not job_post:
        return make_response_error(f"Post with id {job_post_id} not found", HttpStatus.NOT_FOUND)

    return make_response(UserSchema().dumps(job_post.jobApplicants, many=True))
