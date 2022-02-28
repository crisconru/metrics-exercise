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
    return {
        'metrics': cruds.get_metrics(db)
    }


@router.post('/')
def post_metrics(metrics: List[MetricPY], db: Session = Depends(get_db)):
    cruds.create_metrics(db, metrics)
    return {
        'message': 'Metrics inserted correctly'
    }


@router.get('/average/{timestamp}')
def average_metrics(
    timestamp: int,
    avg_search: AVGSearch = AVGSearch.year,
    db: Session = Depends(get_db)
):
    if timestamp < 0:
        raise HTTPException(
            status_code=404,
            detail='timestamp must be a positive integer'
        )
    return {
        'timestamp': timestamp,
        'averages': cruds.average_metrics_by(db, timestamp, avg_search)
    }
