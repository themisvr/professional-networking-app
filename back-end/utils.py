import inspect

from flask import jsonify
from http_constants.status import HttpStatus
from datetime import datetime


def make_response(payload, status=HttpStatus.OK):
    res = jsonify(payload)
    res.status = status
    return res


def make_response_error(msg, status):
    error = {
        "error": {
            "message": msg,
            "timestamp": datetime.now()
        }
    }

    return make_response(error, status)


def json_to_table(json_payload, table):
    cls = table if inspect.isclass(table) else table.__class__
    res = table() if inspect.isclass(table) else table
    for col in cls.__table__.columns.keys():
        if "id" not in col and json_payload.get(col):
            setattr(res, col, json_payload.get(col))
    return res
