from abc import ABC, abstractmethod


class Renderer(ABC):
    @abstractmethod
    def render(self, tower) -> None:
        raise NotImplementedError()

    @abstractmethod
    def log(self, message: str) -> None:
        raise NotImplementedError()
