from tv import Tv


def test_initalizes_with_correct_values():
    my_tv = Tv('24 inches')

    assert(my_tv.volume) == 50
    assert(my_tv.channel) == 1
    assert(my_tv.size) == '24 inches'
    assert(my_tv.isOn) is False
