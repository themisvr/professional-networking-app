from flask import Blueprint, request
from http_constants.status import HttpStatus
from utils import make_response_error, commit_db_session_and_return_successful_response
from db import db, Post, PostSchema, PostCommentSchema, PostLike

bp = Blueprint("posts", __name__, url_prefix="/posts")


@bp.route("/<post_id>/addComment", methods=["POST"])
def add_post_comment(post_id):
    post = Post.query.filter_by(postId=post_id).first()

    if not post:
        return make_response_error(f"Post with id {post_id} not found", HttpStatus.NOT_FOUND)

    content = request.get_json()
    schema = PostCommentSchema()
    post_comment = schema.load(content, session=db.session)
    post.comments.append(post_comment)
    return commit_db_session_and_return_successful_response(db, PostSchema(), post)


@bp.route("/<post_id>/like", methods=["PUT"])
def like_post(post_id):
    post = Post.query.filter_by(postId=post_id).first()

    if not post:
        return make_response_error(f"Post with id {post_id} not found", HttpStatus.NOT_FOUND)

    content = request.get_json()
    user_id = content.get("userId")
    if not user_id:
        return make_response_error(f"Trying to like post with id {post_id} but user id was not provided", HttpStatus.BAD_REQUEST)

    post_like = next((like for like in post.likes if like.userId == user_id), None)
    if not post_like:
        post_like = PostLike()
        post_like.postId = post_id
        post_like.userId = user_id
        post.likes.append(post_like)
    else:
        db.session.delete(post_like)

    return commit_db_session_and_return_successful_response(db, PostSchema(), post)
