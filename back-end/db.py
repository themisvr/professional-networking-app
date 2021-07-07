import click
from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.orm import declarative_base, sessionmaker
from flask import g
from flask.cli import with_appcontext


engine = create_engine('postgresql://postgres:DinaRules@localhost:5432/DiNa')
Session = sessionmaker(bind=engine)

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    username = Column(String)
    name = Column(String)
    surname = Column(String)
    password = Column(String)

    def __repr__(self) -> str:
        return f"<User(name='{self.name}', surname='{self.surname}')>"


def get_session():
    if "session" not in g:
        g.session = Session()

    return g.session


def init_db():
    Base.metadata.create_all(engine)


@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    # init_db()
    app.cli.add_command(init_db_command)

