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
