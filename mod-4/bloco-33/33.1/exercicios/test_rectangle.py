from rectangle import Rectangle


def test_has_correct_properties():
    my_rectangle = Rectangle(height=10, width=6)

    assert(my_rectangle.height) == 10
    assert(my_rectangle.width) == 6
    assert(my_rectangle.area) == 60
    assert(my_rectangle.perimeter) == 32
