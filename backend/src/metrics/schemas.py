from enum import Enum
from pydantic import BaseModel


class Metric(BaseModel):
    name: str
    value: float
    timestamp: int

    class Config:
        orm_mode = True


class AverageSearch(str, Enum):
    year = 'year'
    hour = 'hour'
    minute = 'minute'
