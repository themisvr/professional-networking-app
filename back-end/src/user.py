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

@bp.route("/email", methods=['PUT'])
def update_user():
    if request.args.get("email"):
        email = request.args.get("email")
        user = User.query.filter_by(email=email).first()

        if user:
            content = request.get_json()

            email = content.get("email")
            password = content.get("password")

            if not email and not password:
                return make_response_error("No information is provided", HttpStatus.BAD_REQUEST)

            user = json_to_table(content, User)

            try:
                db.session.commit()
            except Exception as e:
                print(e)
                return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

            return make_response(user)

        else:
            return make_response_error(f"User with email {email} not found", HttpStatus.NOT_FOUND)




