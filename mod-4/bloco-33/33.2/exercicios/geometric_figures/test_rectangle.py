from pytest import approx
from geometric_figures.rectangle import Rectangle


def test_has_correct_perimeter():
    my_rectangle = Rectangle(height=10, width=6)
    assert(my_rectangle.perimeter) == approx(32)


def test_has_correct_area():
    my_rectangle = Rectangle(height=10, width=6)
    assert(my_rectangle.area) == approx(60)
