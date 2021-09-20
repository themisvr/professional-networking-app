import json
import marshmallow
import dicttoxml
from flask import Blueprint, request
from http_constants.status import HttpStatus
from marshmallow_sqlalchemy.fields import fields

from utils import make_response_error, make_response
from db import User, BasicUserInfoSchema

bp = Blueprint("admin", __name__, url_prefix="/admin")


class ExportPersonalInfoSchema(marshmallow.Schema):
    workExperience = fields.String()
    education = fields.String()
    personalSkills = fields.String()


class ExportPostSchema(marshmallow.Schema):
    content = fields.String()
    created = fields.DateTime()
    updated = fields.DateTime()


class ExportJobPostSchema(marshmallow.Schema):
    title = fields.String()
    description = fields.String()


class ExportPostCommentSchema(marshmallow.Schema):
    comment = fields.String()


class ExportUserDataSchema(marshmallow.Schema):
    personalInfo = fields.Nested(ExportPersonalInfoSchema)
    posts = fields.Nested(ExportPostSchema, many=True)
    jobPosts = fields.Nested(ExportJobPostSchema, many=True)
    network = fields.Nested(BasicUserInfoSchema, many=True)
    likedPosts = fields.Nested(ExportPostSchema, many=True)
    comments = fields.Nested(ExportPostCommentSchema, many=True)


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
    res = []
    for user in users:
        user_res = dict(
            personalInfo=user.personalInfo,
            posts=user.posts,
            jobPosts=user.jobPosts,
            network=user.connections,
            comments=user.postComments,
            likedPosts=[likedPost.post for likedPost in user.likedPosts]
        )
        res.append(user_res)

    res_ser = ExportUserDataSchema().dumps(res, many=True)
    res_serialized = dicttoxml.dicttoxml(json.loads(res_ser)) if method.lower() == "xml" else res_ser
    return make_response(res_serialized)
