from functools import cached_property, wraps
from types import MethodType


def cached_property_watch(watched_attribute=''):
    def deleteAttr(self, __name: str, __value):
        print('deletandoooo')
        if (__name == watched_attribute and hasattr(self, watched_attribute)):
            del self.diameter
            del self.area
            del self.perimeter
            del self.circumference
        self.__dict__[__name] = __value
        pass

    def inner_decorator(target_property):
        @cached_property
        @wraps(target_property)
        def _property(self, *args, **kwargs):
            # setattr(self, '__setattr__', MethodType(deleteAttr, self))
            self.__setattr__ = MethodType(deleteAttr, self)
            return target_property(self, *args, **kwargs)

        return _property
    return inner_decorator
