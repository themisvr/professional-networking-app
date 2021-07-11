from db import User, db
from utils import make_response, make_response_error, json_to_table
from http_constants.status import HttpStatus
from flask import Blueprint, request

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route("/register", methods=["POST"])
def register():
    content = request.get_json()

    email = content.get("email")
    password = content.get("password")

    if not email:
        return make_response_error("Email not provided", HttpStatus.BAD_REQUEST)
    elif not password:
        return make_response_error("Password not provided", HttpStatus.BAD_REQUEST)
    elif User.query.filter_by(email=email).first() is not None:
        return make_response_error(f"User with email {email} is already registered", HttpStatus.CONFLICT)

    user = json_to_table(content, User)

    try:
        db.session.add(user)
        db.session.commit()
    except Exception as _:
        return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

    return make_response(user)
