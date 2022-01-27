from pytest import fixture
from tv import TV

@fixture
def my_tv():
    return TV('24 inches')


def test_initalizes_with_correct_values(my_tv):
    assert(my_tv.volume) == 50
    assert(my_tv.channel) == 1
    assert(my_tv.size) == '24 inches'
    assert(my_tv.isOn) is False


def test_increases_volume(my_tv):
    assert(my_tv.volume) == 50

    my_tv.increase_volume()

    assert(my_tv.volume) == 51
