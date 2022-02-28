from sqlalchemy import Column, Integer, String, Float, BigInteger

from ..db.database import Base


class Metric(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    value = Column(Float, nullable=False)
    timestamp = Column(BigInteger, nullable=False)
