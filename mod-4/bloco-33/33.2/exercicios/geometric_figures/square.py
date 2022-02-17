from .geometric_figure import GeometricFigure


class Square(GeometricFigure):
    def __init__(self, side: float) -> None:
        self.side = side

    @property
    def area(self) -> float:
        return self.side ** 2

    @property
    def perimeter(self) -> float:
        return self.side * 4
