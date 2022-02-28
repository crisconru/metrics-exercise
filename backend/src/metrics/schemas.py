from pydantic import BaseModel


class Metric(BaseModel):
    name: str
    value: float
    timestamp: int

    class Config:
        orm_mode = True
