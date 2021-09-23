from flask import request, Blueprint

from db import ChatMessage, ChatMessageSchema, db
from utils import make_response

bp = Blueprint("chat", __name__, url_prefix="/chat")


@bp.route("/messages", methods=["GET"])
def get_messages_for_chat():
    first = request.args.get("first")
    second = request.args.get("second")
    messages = ChatMessage.query. \
        filter((ChatMessage.senderId == first) | (ChatMessage.receiverId == first)). \
        filter((ChatMessage.senderId == second) | (ChatMessage.receiverId == second)). \
        order_by(ChatMessage.date). \
        all()

    return make_response(ChatMessageSchema().dumps(messages, many=True))


user_sessions = {}


def init_chat_endpoints(chat):
    @chat.on("begin")
    def on_begin(userId):
        user_sessions[userId] = request.sid

    @chat.on("disconnect")
    def on_disconnect():
        key_to_delete = None
        for key in user_sessions.keys():
            if user_sessions[key] == request.sid:
                key_to_delete = key
                break

        if key_to_delete:
            user_sessions.pop(key_to_delete)

    @chat.on("message")
    def on_message(message):
        chat.emit("message", message, room=request.sid)
        if message["receiverId"] in user_sessions:
            chat.emit("message", message, room=user_sessions[message["receiverId"]])

        db_message = ChatMessageSchema().load(message, session=db.session)
        db.session.add(db_message)
        db.session.commit()
