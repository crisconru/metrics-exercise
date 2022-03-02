from os import getenv
from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = getenv('DATABASE_URL', 'sqlite:///./test.db')


def get_engine() -> Engine:
    if 'sqlite' in SQLALCHEMY_DATABASE_URL:
        return create_engine(
            SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
        )
    return create_engine(SQLALCHEMY_DATABASE_URL)


engine = get_engine()
SessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

Base = declarative_base()
