from typing import List, Tuple
from datetime import datetime
from datetime import timedelta

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


def get_metrics_by_name(db: Session) -> List[str]:
    return db.\
        query(MetricDB.name).\
        group_by(MetricDB.name).\
        order_by(MetricDB.name).\
        all()


def timestamp_to_int(timestamp: float) -> int:
    return int(timestamp * 1000)


def int_to_timestamp(timestamp: int) -> datetime:
    return datetime.fromtimestamp(timestamp / 1000)


def _bounded_timestamps(
    timestamp: int, search: AVGS = AVGS.day
) -> Tuple[int, int]:
    date = int_to_timestamp(timestamp)
    year = date.year
    month = date.month
    day = date.day
    if search in [AVGS.hour, AVGS.minute]:
        hour = date.hour
        if search == AVGS.minute:
            minute = date.minute
            t_min = datetime(year, month, day, hour, minute).timestamp()
            t_max = datetime(year, month, day, hour, minute + 1).timestamp()
        else:
            t_min = datetime(year, month, day, hour).timestamp()
            t_max = datetime(year, month, day, hour + 1).timestamp()
    else:
        t_min = datetime(year, month, day).timestamp()
        t_max = datetime(year, month, day + 1).timestamp()
    time_min = timestamp_to_int(t_min)
    time_max = timestamp_to_int(t_max)
    return (time_min, time_max)


def _get_metrics_between_timestamps(db: Session, min: int, max: int):
    return db.query(
        MetricDB.name,
        func.avg(MetricDB.value).label('average')
    ).filter(MetricDB.timestamp >= min, MetricDB.timestamp < max).\
        group_by(MetricDB.name).all()


def average_metrics(db: Session, t_min: int, t_max: int, t_step: int):
    aux_data: dict = {}
    average_data: List[dict] = []
    t_slot = t_min
    while t_slot <= t_max:
        t_limit = t_slot + t_step
        db_data = _get_metrics_between_timestamps(db, t_slot, t_limit)
        if len(db_data) > 0:
            for name, avg in db_data:
                aux_data[name] = aux_data[name].append((t_slot, avg)) \
                    if name in aux_data else [(t_slot, avg)]
        t_slot = t_limit
    for key, value in aux_data.items():
        average_data.append({
            'name': key,
            'averages': value
        })
    return average_data


def _step_in_miliseconds(step: float) -> int:
    return int(step * 1000)


get_step = {
    AVGS.day: _step_in_miliseconds(timedelta(hours=1).total_seconds()),
    AVGS.hour: _step_in_miliseconds(timedelta(minutes=1).total_seconds()),
    AVGS.minute: _step_in_miliseconds(timedelta(seconds=1).total_seconds())
}


def average_metrics_by(
    db: Session, timestamp: int,
    search: AVGS
) -> List[dict]:
    time_min, time_max = _bounded_timestamps(timestamp, search)
    time_step = get_step[search]
    return average_metrics(db, time_min, time_max, time_step)
