from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..dependencies import get_db
from .schemas import Metric as MetricPY
from .schemas import AverageSearch as AVGSearch
from . import cruds

router = APIRouter()


@router.get('/')
def get_all_metrics(db: Session = Depends(get_db)):
    metrics = cruds.get_metrics_by_name(db)
    (first_timestamp, last_timestamp) = cruds.get_timestamp_limits(db)
    total = cruds.get_total_metrics(db)
    return {
        'metrics': metrics,
        'firstTimestamp': first_timestamp,
        'lastTimestamp': last_timestamp,
        'total': total
    }


@router.post('/')
def post_metrics(metrics: List[MetricPY], db: Session = Depends(get_db)):
    cruds.create_metrics(db, metrics)
    mtrcs = cruds.get_metrics_by_name(db)
    (first_timestamp, last_timestamp) = cruds.get_timestamp_limits(db)
    total = cruds.get_total_metrics(db)
    return {
        'message': 'Metrics inserted correctly',
        'metrics': mtrcs,
        'firstTimestamp': first_timestamp,
        'lastTimestamp': last_timestamp,
        'total': total
    }


@router.get('/average/')
def average_metrics(
    start: int,
    end: int,
    search: AVGSearch = AVGSearch.day,
    db: Session = Depends(get_db)
):
    t_start = start if start <= end else end
    t_end = end if start <= end else start
    if t_start < 0:
        raise HTTPException(
            status_code=404,
            detail='timestamp must be a positive integer'
        )
    data = cruds.get_average_metrics(db, search, t_start, t_end)
    return {
        'start': t_start,
        'end': t_end,
        'search': search,
        'averages': data
    }
