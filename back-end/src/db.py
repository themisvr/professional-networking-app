import datetime

import click
import utils
import bcrypt
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, fields
from marshmallow import EXCLUDE, fields as mas_fields

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    userId = db.Column("user_id", db.Integer, db.Sequence("user_id_seq"), primary_key=True)
    firstName = db.Column("first_name", db.String, nullable=False)
    lastName = db.Column("last_name", db.String, nullable=False)
    fullName = db.Column("full_name", db.String, nullable=True, default=f"{firstName} {lastName}")
    _password = db.Column("password", db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phoneNumber = db.Column("phone_number", db.String, nullable=True)
    isAdmin = db.Column("is_admin", db.Boolean, nullable=False, default=False)
    posts = db.relationship("Post", backref="user")

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode('utf-8')

    def passwords_match(self, raw_pass):
        return bcrypt.checkpw(raw_pass.encode(), self.password.encode())


class PostComment(db.Model):
    __tablename__ = "post_comments"

    commentId = db.Column("comment_id", db.Integer, db.Sequence("post_comment_id_seq"), primary_key=True)
    postId = db.Column("post_id", db.Integer, db.ForeignKey("posts.post_id"), nullable=False)
    userId = db.Column("user_id", db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    comment = db.Column("comment", db.String, nullable=False)


class Post(db.Model):
    __tablename__ = "posts"

    postId = db.Column("post_id", db.Integer, db.Sequence("post_id_seq"), primary_key=True)
    userId = db.Column("user_id", db.Integer, db.ForeignKey("users.user_id"), nullable=False)
    likes = db.Column("likes", db.Integer, nullable=False, default=0)
    content = db.Column("content", db.String, nullable=False)
    created = db.Column("created", db.DateTime, nullable=False, default=datetime.datetime.now())
    updated = db.Column("updated", db.DateTime, nullable=False, default=datetime.datetime.now())
    comments = db.relationship("PostComment", backref="post")


class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        unknown = EXCLUDE
        load_instance = True


class PostCommentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = PostComment
        unknown = EXCLUDE
        load_instance = True


class PostSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        unknown = EXCLUDE
        load_instance = True

    creator = mas_fields.Pluck(UserSchema(), 'firstName', attribute='user')
    comments = fields.Nested(PostCommentSchema, many=True)


def load_static_data(db):
    for f in utils.get_files_in_dir("../data"):
        sql = text(utils.read_entire_file(f))
        db.engine.execute(sql)


@click.command('init-db')
@with_appcontext
def init_db_command():
    db.drop_all()
    db.create_all()
    load_static_data(db)
    click.echo('Initialized the database.')


def register_db_command(app):
    app.cli.add_command(init_db_command)
