from flask import request, Blueprint
from sqlalchemy import select
from sqlalchemy.sql.expression import func, desc

from db import ChatMessage, ChatMessageSchema, db, User, UserSchema
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


@bp.route("/messagedUsers/<user_id>", methods=["GET"])
def get_messaged_users(user_id):
    u1 = select([ChatMessage.receiverId.label("user_id"), func.max(ChatMessage.date).label("last_msg_date")]). \
        join(User, User.userId == ChatMessage.senderId). \
        filter(User.userId == user_id). \
        group_by(ChatMessage.receiverId)

    u2 = select([ChatMessage.senderId.label("user_id"), func.max(ChatMessage.date).label("last_msg_date")]). \
        join(User, User.userId == ChatMessage.receiverId). \
        filter(User.userId == user_id). \
        group_by(ChatMessage.senderId)

    sub = u1.union(u2).order_by(desc("last_msg_date")).subquery()
    users = User.query.join(sub, User.userId == sub.c.user_id).distinct().all()
    return make_response(UserSchema().dumps(users, many=True))


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
