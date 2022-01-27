from math import pi as PI
from functools import cached_property


class Circle:
    def __init__(self, *, radius):
        self.radius = radius

    @cached_property
    def diameter(self):
        return self.radius * 2

    @cached_property
    def area(self):
        return self.radius ** 2 * PI

    @cached_property
    def perimeter(self):
        return self.diameter * PI

    @cached_property
    def circumference(self):
        return self.perimeter

    def __setattr__(self, __name: str, __value):
        if (__name == 'radius' and hasattr(self, 'radius')):
            del self.diameter
            del self.area
            del self.perimeter
            del self.circumference
        self.__dict__[__name] = __value
        pass
