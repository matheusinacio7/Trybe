from circle_coin import Circle
from pytest import approx


def test_has_correct_attributes():
    my_circle = Circle(radius=6)

    assert(my_circle.radius) == 6
    assert(my_circle.diameter) == 12
    assert approx(my_circle.area, 0.1) == 113.10
    assert approx(my_circle.perimeter, 0.1) == 37.7
    assert approx(my_circle.circumference, 0.1) == 37.7


def test_attributes_get_recalculated():
    my_circle = Circle(radius=6)

    assert(my_circle.radius) == 6
    assert(my_circle.diameter) == 12
    assert approx(my_circle.area, 0.1) == 113.10
    assert approx(my_circle.perimeter, 0.1) == 37.7
    assert approx(my_circle.circumference, 0.1) == 37.7

    my_circle.radius = 10

    assert(my_circle.radius) == 10
    assert(my_circle.diameter) == 20
    assert approx(my_circle.area, 0.1) == 314.16
    assert approx(my_circle.perimeter, 0.1) == 62.83
    assert approx(my_circle.circumference, 0.1) == 62.83
