from functools import cached_property
from threading import RLock


# Heavily inspired on the code of @cached_property
class watchable_property:
    def __init__(self, func):
        self.value = None
        self._observers = []
        self.attrname = None
        self.lock = RLock()

    def __set_name__(self, owner, name):
        if self.attrname is None:
            self.attrname = name
        elif name != self.attrname:
            raise TypeError(
                "Cannot assign the same cached_property "
                "to two different names "
                f"({self.attrname!r} and {name!r})."
            )

    def __set__(self, instance, value):
        instance.__dict__[self.attrname] = value

        self._notify_all()

    def __get__(self, instance, owner=None):
        return instance.__dict__[self.attrname]

    def attach(self, observer):
        self._observers.append(observer)

    def detach(self, observer):
        self.remove(observer)

    def _notify_all(self):
        for observer in self._observers:
            observer.notify()


class _cached_property_watch(cached_property):
    def __init__(self, func, target):
        super().__init__(func)
        self.target = target
        self.target.attach(self)

        self.dirty = True

    def notify(self):
        self.dirty = True

    def __set_name__(self, owner, name):
        super().__set_name__(owner, "_{name}")

    def __get__(self, instance, owner=None):
        if self.dirty:
            try:
                del instance.__dict__[self.attrname]
            except (KeyError, AttributeError):
                pass

            self.dirty = False

        return super().__get__(instance, owner)


def cached_property_watch(target):
    def wrapper(func):
        return _cached_property_watch(func, target)

    return wrapper
