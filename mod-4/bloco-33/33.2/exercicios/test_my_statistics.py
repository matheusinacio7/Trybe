from pytest import fixture
from my_statistics import Statistics


@fixture
def number_list():
    return [2, 2, 2, 3, 4, 5, 5, 8, 10, 13]


def test_gets_correct_mean(number_list):
    stats = Statistics(number_list)

    assert(stats.getMean()) == 5.4


def test_gets_correct_median(number_list):
    stats = Statistics(number_list)

    assert(stats.getMedian()) == 4.5


def test_gets_correct_mode(number_list):
    stats = Statistics(number_list)

    assert(stats.getMode()) == 2
