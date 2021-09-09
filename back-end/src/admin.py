from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response_error, commit_db_session_and_return_successful_response
from db import db, Post, PostSchema, User

bp = Blueprint("admin", __name__, url_prefix="/admin")


@bp.route("/exportUserData/<user_id>", methods=["GET"])
def export_user_data(user_id):
    user = User.query.filter(userId=user_id).first()

    if not user:
        return make_response_error(f"User with id {user_id} was not found", HttpStatus.NOT_FOUND)

