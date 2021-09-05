import os

from marshmallow import Schema, fields
from flask import Response, current_app
from http_constants.status import HttpStatus
from datetime import datetime


def make_response(payload, status: HttpStatus = HttpStatus.OK) -> Response:
    res = Response(payload, mimetype=current_app.config["JSONIFY_MIMETYPE"])
    res.status = status
    return res


class ErrorSchema(Schema):
    message = fields.String()
    timestamp = fields.DateTime()


class ErrorResponseSchema(Schema):
    error = fields.Nested(ErrorSchema())


def make_response_error(msg: str, status: HttpStatus) -> Response:
    error_dict = {
        'error': {
            'message': msg,
            'timestamp': datetime.now()
        }
    }

    schema = ErrorResponseSchema()
    error_payload = schema.dumps(error_dict)

    return make_response(error_payload, status)


def get_files_in_dir(dir_path: str) -> list[str]:
    return [os.path.join(dir_path, f) for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]


def read_entire_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()


def commit_db_session_or_return_error_response(db):
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

    return None


def commit_db_session_and_return_successful_response(db, schema, resp_data):
    err = commit_db_session_or_return_error_response(db)
    return err if err else make_response(schema.dumps(resp_data))


def get_user_with_email_or_return_error(email):
    from db import User
    if not email:
        return None, make_response_error("No email provided", HttpStatus.BAD_REQUEST)

    user = User.query.filter_by(email=email).first()
    if not user:
        return None, make_response_error(f"User with email {email} not found", HttpStatus.NOT_FOUND)

    return user, None


def get_user_with_id_or_return_error(id):
    from db import User
    if not id:
        return None, make_response_error("No user id provided", HttpStatus.BAD_REQUEST)

    user = User.query.filter_by(userId=id).first()
    if not user:
        return None, make_response_error(f"User with user id {id} not found", HttpStatus.NOT_FOUND)

    return user, None
