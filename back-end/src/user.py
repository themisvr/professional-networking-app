from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response, make_response_error, json_to_table
from db import User, db

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


@bp.route("/changeEmail", methods=['PUT'])
def update_email():
    content = request.get_json()
    email = content.get("email")
    user = User.query.filter_by(email=email).first()

    if not user:
        return make_response_error(f"User with email {email} not found", HttpStatus.NOT_FOUND)

    new_email = content.get("newEmail")
    if not new_email:
        return make_response_error("No email provided", HttpStatus.BAD_REQUEST)

    if User.query.filter_by(email=new_email).first():
        return make_response_error(f"User with email {new_email} already exists", HttpStatus.CONFLICT)

    user.email = new_email
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

    return make_response(user)


@bp.route("/changePassword", methods=['PUT'])
def update_password():
    content = request.get_json()
    email = content.get("email")
    user = User.query.filter_by(email=email).first()

    if not user:
        return make_response_error(f"User with email {email} not found", HttpStatus.NOT_FOUND)

    old_password = content.get("oldPassword")
    if not user.passwords_match(old_password):
        return make_response_error("Old password is incorrect", HttpStatus.UNAUTHORIZED)

    new_password = content.get("newPassword")
    if not new_password:
        return make_response_error("No new password provided", HttpStatus.BAD_REQUEST)


    user.password = new_password
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

    return make_response(user)
