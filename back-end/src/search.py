from db import User, UserSchema
from utils import make_response
from flask import Blueprint

bp = Blueprint('search', __name__, url_prefix='/search')


@bp.route("", methods=["GET"])
def register():
    return make_response(UserSchema().dumps([User.query.filter_by(userId=2).first()], many=True))
