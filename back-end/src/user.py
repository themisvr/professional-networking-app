from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response, make_response_error
from db import User

bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route("", methods=["GET"])
def get_users():
    if request.args.get("email"):
        email = request.args.get("email")
        user = User.query.filter_by(email=email).first()

        if user:
            return make_response(user)
        else:
            return make_response_error(f"User with email {email} not found", HttpStatus.NOT_FOUND)

    users = User.query.all()
    return make_response(users)

