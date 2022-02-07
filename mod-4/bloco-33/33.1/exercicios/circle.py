from math import pi as PI
# from functools import cached_property
from cached_property_watch import cached_property_watch


class Circle:
    def __init__(self, *, radius):
        self.radius = radius

    @cached_property_watch('radius')
    def diameter(self):
        return self.radius * 2

    @cached_property_watch('radius')
    def area(self):
        return self.radius ** 2 * PI

    @cached_property_watch('radius')
    def perimeter(self):
        return self.diameter * PI

    @cached_property_watch('radius')
    def circumference(self):
        return self.perimeter

    # def __setattr__(self, __name: str, __value):
    #     if (__name == 'radius' and hasattr(self, 'radius')):
    #         del self.diameter
    #         del self.area
    #         del self.perimeter
    #         del self.circumference
    #     self.__dict__[__name] = __value
    #     pass
