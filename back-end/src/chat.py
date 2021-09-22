from flask import request

users = {}


def init_chat_endpoints(chat):
    @chat.on("begin")
    def on_begin(userId):
        users[userId] = request.sid

    @chat.on("disconnect")
    def on_disconnect():
        key_to_delete = None
        for key in users.keys():
            if users[key] == request.sid:
                key_to_delete = key
                break

        if key_to_delete:
            users.pop(key_to_delete)

    @chat.on("get_messages")
    def on_get_messages(user_data):
        print(f"{user_data['from']} requested messages for {user_data['to']}")
        return []

    @chat.on("message")
    def on_message(message):
        print(message)
        print(request.sid)
        message["from"] = request.sid
        chat.emit("message", message, room=request.sid)
        chat.emit("message", message, room=users[message["to"]])
