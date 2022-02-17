from abc import ABC, abstractproperty


class GeometricFigure(ABC):
    @abstractproperty
    def area() -> float:
        raise NotImplementedError

    @abstractproperty
    def perimeter() -> float:
        raise NotImplementedError
