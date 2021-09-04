from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response_error, commit_db_session_and_return_successful_response, \
    get_user_with_email_or_return_error
from db import db, JobPost, JobPostSchema

bp = Blueprint("jobPosts", __name__, url_prefix="/jobPosts")


@bp.route("/<job_post_id>/apply", methods=["POST"])
def update_post(job_post_id):
    context = request.get_json()
    user, err = get_user_with_email_or_return_error(context["email"])

    if not user:
        return err

    job_post = JobPost.query.filter_by(jobPostId=job_post_id).first()

    if not job_post:
        return make_response_error(f"Post with id {job_post_id} not found", HttpStatus.NOT_FOUND)

    user.jobApplications.append(job_post)
    return commit_db_session_and_return_successful_response(db, JobPostSchema(), job_post)
