from datetime import datetime
from sqlalchemy.orm import Session

from src.metrics.models import Metric as MetricDB


class TestMetricsCrud:
    def fill_test_data(self, db: Session):
        name = 'uno'
        value = 34.5
        timestamp = int(
            datetime(2022, 1, 1, 1, 1, 1, 10000).timestamp() * 1000)
        db.add(MetricDB(name=name, value=value, timestamp=timestamp))
        db.commit()

    def test_fill(self, metrics_db: Session):
        self.fill_test_data(metrics_db)
        num = metrics_db.query(MetricDB).count()
        assert num == 1
