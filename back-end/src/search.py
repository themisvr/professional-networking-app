from http_constants.status import HttpStatus

from db import User, UserSchema
from utils import make_response, make_response_error
from flask import Blueprint, request

bp = Blueprint('search', __name__, url_prefix='/search')


@bp.route("", methods=["GET"])
def search():
    term = request.args.get("term")
    if not term:
        return make_response_error("No search term provided", HttpStatus.BAD_REQUEST)

    results = User.query.filter(User.__ts_vector__.match(term), User.isAdmin == False).all()
    return make_response(UserSchema().dumps(results, many=True))
