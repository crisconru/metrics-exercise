import os
from pathlib import Path

from pytest import fixture

from src.metrics import models as metrics_model

DATABASE_FILE = './test.db'
DATABASE_URL = f'sqlite:///{DATABASE_FILE}'
os.environ['DATABASE_URL'] = DATABASE_URL


@fixture(scope='class')
def metrics_db():
    from src.db import database

    metrics_model.Base.metadata.create_all(bind=database.engine)
    try:
        db = database.SessionLocal()
        yield db
    finally:
        db.close()
        Path(DATABASE_FILE).unlink(missing_ok=True)
