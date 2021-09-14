from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response_error, make_response
from db import db, User, UserSchema

bp = Blueprint("admin", __name__, url_prefix="/admin")


@bp.route("/exportUserData", methods=["POST"])
def export_user_data():
    content = request.get_json()

    user_ids = content.get("userIds")
    if not user_ids:
        return make_response_error("No user ids provided in order to export data", HttpStatus.BAD_REQUEST)

    method = content.get("method")
    if not method:
        return make_response_error("No method was provided in order to export data", HttpStatus.BAD_REQUEST)

    if method.lower() not in ["json", "xml"]:
        return make_response_error(f"Export method {method} not allowed. Only JSON and XML", HttpStatus.BAD_REQUEST)

    users = User.query.filter(User.userId.in_(user_ids)).all()
    return make_response(UserSchema().dumps(users, many=True))
