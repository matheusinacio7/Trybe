from pytest import approx
from .square import Square


def test_has_correct_perimeter():
    my_square = Square(10)
    assert(my_square.perimeter) == approx(40)


def test_has_correct_area():
    my_square = Square(10)
    assert(my_square.area) == approx(100)
