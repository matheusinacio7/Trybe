from math import pi as PI
from .geometric_figure import GeometricFigure


class Circle(GeometricFigure):
    def __init__(self, radius: float):
        self.radius = radius

    @property
    def area(self) -> float:
        return self.radius ** 2 * PI

    @property
    def perimeter(self) -> float:
        return 2 * PI * self.radius
