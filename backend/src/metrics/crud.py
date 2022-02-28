from datetime import datetime
from sqlalchemy.orm import Session
from .models import Metric as MetricDB
from .schemas import Metric as MetricPY


def _create_metric(db: Session, metric: MetricPY):
    prev_metric = db.\
        query(MetricDB).\
        filter(
            MetricDB.name == metric.name,
            MetricDB.timestamp == metric.timestamp
        ).\
        first()
    if prev_metric:
        prev_metric.value = metric.value
        db.commit()
    else:
        db_metric = MetricDB(
            name=metric.name, value=metric.value, timestamp=metric.timestamp
        )
        db.add(db_metric)


def create_metrics(db: Session, py_metrics: list[MetricPY]) -> bool:
    for py_metric in py_metrics:
        _create_metric(db, py_metric)
    db.commit()
    return True


def get_metrics(db: Session) -> list[MetricPY]:
    return db.query(MetricDB).all()


def get_metrics_by_year(db: Session, year: int):
    time_min = datetime(year, 1, 1).timestamp()
    time_max = datetime(year + 1, 1, 1).timestamp()


def get_bounded_metrics(db: Session, skip: int = 0, limit: int = 100):
    return db.query(MetricDB).offset(skip).limit(limit).all()
