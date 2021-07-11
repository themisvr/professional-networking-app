import click
from passlib.hash import bcrypt
from dataclasses import dataclass
from flask.cli import with_appcontext
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property

db = SQLAlchemy()


@dataclass
class User(db.Model):
    __tablename__ = "users"

    name: str
    surname: str
    email: str
    telephone: str

    user_id = db.Column(db.Integer, db.Sequence("user_id_seq"), primary_key=True)
    name = db.Column(db.String, nullable=False)
    surname = db.Column(db.String, nullable=False)
    _password = db.Column("password", db.String, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    telephone = db.Column(db.String, nullable=True)

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def password(self, password):
        self._password = bcrypt.encrypt(password)


@click.command('init-db')
@with_appcontext
def init_db_command():
    db.drop_all()
    db.create_all()
    click.echo('Initialized the database.')


def register_db_command(app):
    app.cli.add_command(init_db_command)
