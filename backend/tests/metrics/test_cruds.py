from typing import List
from datetime import datetime
from sqlalchemy.orm import Session

from src.metrics.models import Metric as MetricDB
from src.metrics.schemas import Metric as MetricPY
from src.metrics import cruds


class TestCruds:
    def get_fake_metrics(self) -> List[MetricPY]:
        date = datetime(2022, 1, 1, 1, 1, 1)
        timestamp = cruds.timestamp_to_int(date.timestamp())
        ms = []
        uno = MetricPY(name='uno', value=34.5, timestamp=timestamp)
        ms.append(uno)
        timestamp += 345
        dos = MetricPY(name='dos', value=3.5, timestamp=timestamp)
        ms.append(dos)
        timestamp += 345
        uno = MetricPY(name='uno', value=5.4, timestamp=timestamp)
        ms.append(uno)
        return ms

    def test_create_metrics(self, metrics_db: Session):
        fake_metrics = self.get_fake_metrics()
        if (cruds.create_metrics(metrics_db, fake_metrics)):
            db_metrics = cruds.get_metrics(metrics_db)
            equal_len = len(fake_metrics) == len(db_metrics)
            assert equal_len
            if equal_len:
                for i in range(len(db_metrics)):
                    assert fake_metrics[i].name == db_metrics[i].name
                    assert fake_metrics[i].value == db_metrics[i].value
                    assert fake_metrics[i].timestamp == db_metrics[i].timestamp
        else:
            assert False

    def test_create_metrics_rewrite(self, metrics_db: Session):
        db_len_prev = len(cruds.get_metrics(metrics_db))
        fake_metric = self.get_fake_metrics()[0]
        fake_metric.value = 40.5
        ms = [fake_metric]
        if (cruds.create_metrics(metrics_db, ms)):
            db_len_next = len(cruds.get_metrics(metrics_db))
            assert db_len_prev == db_len_next
            if db_len_prev == db_len_next:
                m = metrics_db.query(MetricDB).\
                    filter(
                        MetricDB.timestamp == ms[0].timestamp,
                        MetricDB.name == ms[0].name
                    ).\
                    first()
                assert m.value == ms[0].value if m else False
        else:
            assert False

    def test_average_metrics_by_year(self, metrics_db: Session):
        date = datetime(2022, 4, 5, 1, 4, 6)
        timestamp = cruds.timestamp_to_int(date.timestamp())
        response = cruds.average_metrics_by_year(metrics_db, timestamp)
        assert len(response) == 2
        for name, average in response:
            if name == 'uno':
                assert average == 22.95
            if name == 'dos':
                assert average == 3.5
        timestamp = int(datetime(2023, 4, 5, 1, 4, 6).timestamp() * 1000)
        response = cruds.average_metrics_by_year(metrics_db, timestamp)
        assert len(response) == 0

    def test_average_metrics_by_hour(self, metrics_db: Session):
        date = datetime(2022, 1, 1, 1, 1, 1)
        timestamp = cruds.timestamp_to_int(date.timestamp())
        response = cruds.average_metrics_by_hour(metrics_db, timestamp)
        assert len(response) == 2
        for name, average in response:
            if name == 'uno':
                assert average == 22.95
            if name == 'dos':
                assert average == 3.5
        date = datetime(2023, 4, 5, 1, 4, 6)
        timestamp = cruds.timestamp_to_int(date.timestamp())
        response = cruds.average_metrics_by_hour(metrics_db, timestamp)
        assert len(response) == 0

    def test_average_metrics_by_minute(self, metrics_db: Session):
        date = datetime(2022, 1, 1, 1, 1, 1)
        timestamp = cruds.timestamp_to_int(date.timestamp())
        response = cruds.average_metrics_by_minute(metrics_db, timestamp)
        assert len(response) == 2
        for name, average in response:
            if name == 'uno':
                assert average == 22.95
            if name == 'dos':
                assert average == 3.5
        date = datetime(2023, 4, 5, 1, 4, 6)
        timestamp = cruds.timestamp_to_int(date.timestamp())
        response = cruds.average_metrics_by_minute(metrics_db, timestamp)
        assert len(response) == 0
