from db import User, db, UserSchema, PersonalInfo
from utils import make_response, make_response_error, commit_db_session_and_return_successful_response
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

    schema = UserSchema()
    user = schema.load(content, session=db.session)
    user.personalInfo = PersonalInfo()
    db.session.add(user)
    return commit_db_session_and_return_successful_response(db, schema, user)


@bp.route("/login", methods=["POST"])
def login():
    content = request.get_json()

    email = content.get("email")
    password = content.get("password")

    if not email:
        return make_response_error("Email not provided", HttpStatus.BAD_REQUEST)
    elif not password:
        return make_response_error("Password not provided", HttpStatus.BAD_REQUEST)

    user = User.query.filter_by(email=email).first()
    if user is None:
        return make_response_error(f"User with email {email} not found", HttpStatus.NOT_FOUND)

    if not user.passwords_match(password):
        return make_response_error("Username or password incorrect", HttpStatus.UNAUTHORIZED)

    return make_response(UserSchema().dumps(user))
