import click
import utils
import bcrypt
from dataclasses import dataclass
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from sqlalchemy.ext.hybrid import hybrid_property

db = SQLAlchemy()


@dataclass
class User(db.Model):
    __tablename__ = "users"

    firstName: str
    lastName: str
    email: str
    phoneNumber: str
    isAdmin: bool

    userId = db.Column("user_id", db.Integer, db.Sequence("user_id_seq"), primary_key=True)
    firstName = db.Column("first_name", db.String, nullable=False)
    lastName = db.Column("last_name", db.String, nullable=False)
    _password = db.Column("password", db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    phoneNumber = db.Column("phone_number", db.String, nullable=True)
    isAdmin = db.Column("is_admin", db.Boolean, nullable=False, default=False)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    def passwords_match(self, raw_pass):
        return bcrypt.checkpw(raw_pass.encode(), self.password.encode())


@dataclass
class Post(db.Model):
    __tablename__ = "posts"

    post_id: int
    content: str

    post_id = db.Column("post_id", db.Integer, db.Sequence("post_id_seq"), primary_key=True)
    content = db.Column("content", db.String, nullable=False)
    created = db.Column("created", db.DateTime, nullable=False)
    comments = db.relationship("PostComment", backref="post")


@dataclass
class PostComment(db.Model):
    __tablename__ = "post_comments"

    comment_id: int
    post_id: int

    comment_id = db.Column("comment_id", db.Integer, db.Sequence("post_comment_id_seq"), primary_key=True)
    post_id = db.Column("post_id", db.Integer, db.ForeignKey("posts.post_id"))
    post = db.relationship("Post")


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
