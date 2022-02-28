from typing import List, Optional, Tuple
from datetime import datetime

from sqlalchemy.orm import Session
from sqlalchemy import func

from .models import Metric as MetricDB
from .schemas import Metric as MetricPY
from .schemas import AverageSearch as AVGS


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


def create_metrics(db: Session, py_metrics: List[MetricPY]) -> bool:
    for py_metric in py_metrics:
        _create_metric(db, py_metric)
    db.commit()
    return True


def get_metrics(db: Session) -> List[MetricDB]:
    return db.query(MetricDB).all()


def timestamp_to_int(timestamp: float) -> int:
    return int(timestamp * 1000)


def int_to_timestamp(timestamp: int) -> datetime:
    return datetime.fromtimestamp(timestamp / 1000)


def _bounded_timestamps(
    timestamp: int, search: AVGS = AVGS.year
) -> Tuple[int, int]:
    date = int_to_timestamp(timestamp)
    year = date.year
    if search in [AVGS.hour, AVGS.minute]:
        month = date.month
        day = date.day
        hour = date.hour
        if search == AVGS.minute:
            minute = date.minute
            t_min = datetime(year, month, day, hour, minute).timestamp()
            t_max = datetime(year, month, day, hour, minute + 1).timestamp()
        else:
            t_min = datetime(year, month, day, hour).timestamp()
            t_max = datetime(year, month, day, hour + 1).timestamp()
    else:
        t_min = datetime(year, 1, 1).timestamp()
        t_max = datetime(year + 1, 1, 1).timestamp()
    time_min = timestamp_to_int(t_min)
    time_max = timestamp_to_int(t_max)
    return (time_min, time_max)


def _get_metrics_between_timestamps(db: Session, min: int, max: int):
    return db.query(
        MetricDB.name,
        func.avg(MetricDB.value).label('average')
    ).filter(MetricDB.timestamp >= min, MetricDB.timestamp < max).\
        group_by(MetricDB.name).all()


def average_metrics_by_year(db: Session, timestamp: int) -> list:
    time_min, time_max = _bounded_timestamps(timestamp)
    return _get_metrics_between_timestamps(db, time_min, time_max)


def average_metrics_by_hour(db: Session, timestamp: int) -> list:
    time_min, time_max = _bounded_timestamps(timestamp, AVGS.hour)
    return _get_metrics_between_timestamps(db, time_min, time_max)


def average_metrics_by_minute(db: Session, timestamp: int) -> list:
    time_min, time_max = _bounded_timestamps(timestamp, AVGS.minute)
    return _get_metrics_between_timestamps(db, time_min, time_max)


def average_metrics_by(
    db: Session, timestamp: int,
    search: AVGS
) -> List[dict]:
    averages: Optional[list] = None
    if search == AVGS.year:
        averages = average_metrics_by_year(db, timestamp)
    elif search == AVGS.hour:
        averages = average_metrics_by_hour(db, timestamp)
    elif search == AVGS.minute:
        averages = average_metrics_by_minute(db, timestamp)
    avgs = []
    if averages:
        for name, avg in averages:
            avgs.append({name:  avg})
    return avgs
