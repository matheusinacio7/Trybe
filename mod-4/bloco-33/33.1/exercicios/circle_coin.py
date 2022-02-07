from math import pi as PI
from cached_property_watch_ import cached_property_watch, watchable_property


class Circle:
    def __init__(self, radius):
        # Awkward, this actually uses the property/method,
        # not the attribute
        self.radius = radius

    @watchable_property
    def radius(self):
        # Ugly, this method is here just holding the property.
        # We can't use assign the property to an attribute because
        # it needs to be referenced by the cached properties directly,
        # instead of by name.
        pass

    @cached_property_watch(radius)
    def diameter(self):
        return self.radius * 2

    @cached_property_watch(radius)
    def area(self):
        return self.radius ** 2 * PI

    @cached_property_watch(radius)
    def perimeter(self):
        return self.diameter * PI

    @cached_property_watch(radius)
    def circumference(self):
        return self.perimeter
