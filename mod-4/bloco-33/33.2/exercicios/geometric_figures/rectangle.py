from .geometric_figure import GeometricFigure


class Rectangle(GeometricFigure):
    def __init__(self, *, height: float, width: float) -> None:
        self.height = height
        self.width = width

    @property
    def area(self) -> float:
        return self.height * self.width

    @property
    def perimeter(self) -> float:
        return (self.height + self.width) * 2
