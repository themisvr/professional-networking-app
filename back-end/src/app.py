import os
import chat
import db
import admin
import auth
import user
import posts
import jobPosts
import search
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:DinaRules@localhost:5432/DiNa'
    app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
    db.db.init_app(app)

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.register_db_command(app)
    app.register_blueprint(user.bp)
    app.register_blueprint(auth.bp)
    app.register_blueprint(posts.bp)
    app.register_blueprint(jobPosts.bp)
    app.register_blueprint(search.bp)
    app.register_blueprint(admin.bp)

    return app


if __name__ == "__main__":
    app = create_app()
    socketio = SocketIO(app, cors_allowed_origins="*")
    chat.init_chat_endpoints(socketio)
    socketio.run(app, host='0.0.0.0', port=5000, debug=True, ssl_context=('../cert.pem', '../key.pem'))
