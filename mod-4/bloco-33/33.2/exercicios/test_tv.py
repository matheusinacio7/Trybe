from pytest import fixture
from tv import TV

@fixture
def my_tv():
    return TV('24 inches')


def test_initalizes_with_correct_values(my_tv: TV):
    assert(my_tv._volume) == 50
    assert(my_tv._channel) == 1
    assert(my_tv._size) == '24 inches'
    assert(my_tv._isOn) is False


def test_increases_volume(my_tv):
    assert(my_tv._volume) == 50

    my_tv.increase_volume()

    assert(my_tv._volume) == 51


def test_volume_cant_get_over_99(my_tv):
    for i in range(100):
        my_tv.increase_volume()

    assert(my_tv._volume) == 99
