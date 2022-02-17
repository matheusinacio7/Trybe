from pytest import approx
from .circle import Circle


def test_has_correct_perimeter():
    my_circle = Circle(10)
    assert(my_circle.perimeter) == approx(62.83, 0.01)


def test_has_correct_area():
    my_circle = Circle(10)
    assert(my_circle.area) == approx(314.16, 0.01)
