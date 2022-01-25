from math import pi as PI


class Circle:
    def __init__(self, *, radius):
        self.radius = radius

    @property
    def diameter(self):
        return self.radius * 2

    @property
    def area(self):
        return self.radius ** 2 * PI

    @property
    def perimeter(self):
        return self.diameter * PI

    @property
    def circumference(self):
        return self.perimeter
