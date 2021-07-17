import inspect
import os

from flask import jsonify, Response
from http_constants.status import HttpStatus
from datetime import datetime


def make_response(payload, status: HttpStatus = HttpStatus.OK) -> Response:
    res = jsonify(payload)
    res.status = status
    return res


def make_response_error(msg: str, status: HttpStatus) -> Response:
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
    attrs = [a for a in dir(cls) if not a.startswith("__")]
    for col in attrs:
        if "id" not in col and json_payload.get(col):
            setattr(res, col, json_payload.get(col))
    return res


def get_files_in_dir(dir_path: str) -> list[str]:
    return [os.path.join(dir_path, f) for f in os.listdir(dir_path) if os.path.isfile(os.path.join(dir_path, f))]


def read_entire_file(path: str) -> str:
    with open(path, "r") as f:
        return f.read()
