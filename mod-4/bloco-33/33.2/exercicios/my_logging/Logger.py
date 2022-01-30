from abc import ABC, abstractmethod


class Logger(ABC):
    @abstractmethod
    def log(message: str) -> None:
        raise NotImplementedError
