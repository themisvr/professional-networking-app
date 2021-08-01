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
    message: fields.String
    timestamp: fields.DateTime


class ErrorResponseSchema(Schema):
    error: fields.Nested(ErrorSchema())


class ErrorResponse:
    __ma_schema__ = ErrorResponseSchema
    message: str
    timestamp: datetime


def make_response_error(msg: str, status: HttpStatus) -> Response:
    error = ErrorResponse
    error.message = msg
    error.timestamp = datetime.now()

    return make_response(error, status)


def get_files_in_dir(dir_path: str) -> list[str]:
    return [os.path.join(dir_path, f) for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]


def read_entire_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()


def commit_db_session_and_return_successful_response(db, schema, resp_data):
    try:
        db.session.commit()
    except Exception as e:
        print(e)
        return make_response_error("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)

    return make_response(schema.dumps(resp_data))
