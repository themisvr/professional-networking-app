from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response_error, commit_db_session_and_return_successful_response
from db import db, Post, PostSchema

bp = Blueprint("posts", __name__, url_prefix="/posts")


@bp.route("/<post_id>", methods=["PUT"])
def update_post(post_id):
    post = Post.query.filter_by(postId=post_id).first()
    if not post:
        return make_response_error(f"Post with id {post_id} not found", HttpStatus.NOT_FOUND)

    content = request.get_json()
    schema = PostSchema(exclude=("creator", ))
    post = schema.load(content, instance=post, session=db.session)
    return commit_db_session_and_return_successful_response(db, schema, post)
