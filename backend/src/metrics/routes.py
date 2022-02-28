from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..dependencies import get_db
from . import schemas
from .crud import get_metrics, create_metrics

router = APIRouter()


@router.get('/')
def get_all_metrics(db: Session = Depends(get_db)):
    metrics = get_metrics(db)
    print(metrics)
    return {
        'metrics': metrics
    }


@router.post('/')
def post_metrics(metrics: list[schemas.Metric], db: Session = Depends(get_db)):
    create_metrics(db, metrics)
    return {
        'message': 'Metrics inserted correctly'
    }
