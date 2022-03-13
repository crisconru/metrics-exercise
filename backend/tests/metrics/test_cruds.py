import math
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session

from src.metrics.models import Metric as MetricDB
from src.metrics.schemas import Metric as MetricPY
from src.metrics.schemas import AverageSearch as AVGS
from src.metrics import cruds


uno_values = [2.0, 2.2, 2.3, 2.4, 2.5]
uno_timestamps = [
    cruds.timestamp_to_int(
        datetime(2022, 2, 3, 10, 11, 12, 130000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 3, 10, 11, 12, 140000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 4, 10, 11, 12, 130000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 4, 10, 11, 12, 140000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 4, 10, 12, 12, 130000).timestamp())
]

dos_values = [3.9, 3.8, 3.7, 3.5]
dos_timestamps = [
    cruds.timestamp_to_int(
        datetime(2022, 2, 3, 10, 11, 12, 130000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 3, 10, 11, 12, 140000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 4, 10, 11, 12, 130000).timestamp()),
    cruds.timestamp_to_int(
        datetime(2022, 2, 4, 10, 12, 12, 130000).timestamp())
]


class TestCruds:
    def get_fake_metrics(self) -> List[MetricPY]:
        uno = [MetricPY(
            name='uno',
            value=uno_values[i],
            timestamp=uno_timestamps[i]) for i in range(len(uno_values))]
        dos = [MetricPY(
            name='dos',
            value=dos_values[i],
            timestamp=dos_timestamps[i]) for i in range(len(dos_values))]
        return uno + dos

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
        fake_metric.value = 2.1
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

    # def test_average_metrics_by_day(self, metrics_db: Session):
    #     date = datetime(2022, 2, 3, 10, 11, 12)
    #     timestamp = cruds.timestamp_to_int(date.timestamp())
    #     response = cruds.average_metrics_by(metrics_db, timestamp, AVGS.day)
    #     assert len(response) == 2
    #     for elem in response:
    #         print('elem')
    #         print(elem)
    #         if elem['name'] == 'uno':
    #             assert math.isclose(elem['averages'][0][1], 2.15)
    #         if elem['name'] == 'dos':
    #             assert math.isclose(elem['averages'][0][1], 3.85)
    #     timestamp = int(datetime(2023, 4, 5, 1, 4, 6).timestamp() * 1000)
    #     response = cruds.average_metrics_by(metrics_db, timestamp, AVGS.day)
    #     assert len(response) == 0

    def test_get_average_metrics(self, metrics_db: Session):
        date_start = datetime(2022, 2, 3, 10, 11, 12)
        date_end = datetime(2022, 2, 4, 10, 11, 12)
        start = cruds.timestamp_to_int(date_start.timestamp())
        end = cruds.timestamp_to_int(date_end.timestamp())
        response = cruds.get_average_metrics(metrics_db, AVGS.day, start, end)
        assert len(response) == 2
        for elem in response:
            print('elem')
            print(elem)
            if elem['name'] == 'uno':
                assert math.isclose(elem['averages'][0][1], 2.15)
            if elem['name'] == 'dos':
                assert math.isclose(elem['averages'][0][1], 3.85)
        t_start = int(datetime(2023, 4, 5, 1, 4, 6).timestamp() * 1000)
        t_end = int(datetime(2023, 4, 6, 1, 4, 6).timestamp() * 1000)
        response = cruds.get_average_metrics(
            metrics_db, AVGS.day, t_start, t_end)
        assert len(response) == 0
