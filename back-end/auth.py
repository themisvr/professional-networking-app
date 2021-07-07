from db import User, get_session

from flask import Blueprint, request
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route("/register", methods=["POST"])
def register():
    session = get_session()
    content = request.get_json()

    username = content["username"]
    password = content["password"]

    if not username:
        return "Username not provided"
    elif not password:
        return "Password not provided"
    elif session.query(User).filter(User.username == username).first() is not None:
        return f"User {username} is already registered"

    user = User(name=content["name"], surname=content["surname"], username=username, password=password)
    session.add(user)
    session.commit()
    return "Saved"
