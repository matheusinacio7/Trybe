from pytest import fixture, raises
from tv import TV


@fixture
def my_tv():
    return TV('24 inches')


def test_initalizes_with_correct_values(my_tv: TV):
    assert(my_tv._volume) == 50
    assert(my_tv._channel) == 1
    assert(my_tv._size) == '24 inches'
    assert(my_tv._isOn) is False


def test_increases_volume(my_tv: TV):
    assert(my_tv._volume) == 50

    my_tv.increase_volume()

    assert(my_tv._volume) == 51


def test_volume_cant_get_over_99(my_tv: TV):
    for i in range(100):
        my_tv.increase_volume()

    assert(my_tv._volume) == 99


def test_decreases_volume(my_tv: TV):
    assert(my_tv._volume) == 50

    my_tv.decrease_volume()

    assert(my_tv._volume) == 49


def test_volume_cant_get_under_0(my_tv: TV):
    for i in range(100):
        my_tv.decrease_volume()

    assert(my_tv._volume) == 0


def test_cant_change_channel_to_value_outside_range(my_tv: TV):
    disallowed_channels = [0, -10, 100]

    for channel in disallowed_channels:
        with raises(ValueError,
                    match=('Channel must be between 1 and 99. '
                           f'Received: {channel}')):
            my_tv.change_channel(channel)


def test_changes_channel_correctly(my_tv: TV):
    allowed_channels = list(range(1, 100))

    for channel in allowed_channels:
        my_tv.change_channel(channel)
        assert(my_tv._channel) == channel


def test_toggle_on_turns_on_when_its_off(my_tv: TV):
    assert(my_tv._isOn) is False

    my_tv.toggle_on()

    assert(my_tv._isOn) is True


def test_toggle_on_turns_off_when_its_on(my_tv: TV):
    my_tv.toggle_on()

    assert(my_tv._isOn) is True

    my_tv.toggle_on()

    assert(my_tv._isOn) is False
