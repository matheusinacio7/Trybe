from typing import List
from .Logger import Logger


class EventBus():
    def __init__(self, *, loggers: List[Logger] = []) -> None:
        self.__loggers: List[Logger]

    def __format(*, message: str, severity: str) -> str:
        raise NotImplementedError

    def __log(message: str) -> None:
        raise NotImplementedError

    def add_logger(logger: Logger) -> None:
        raise NotImplementedError
    
    def debug(message: str) -> None:
        raise NotImplementedError

    def error(message: str) -> None:
        raise NotImplementedError

    def info(message: str) -> None:
        raise NotImplementedError

    def warn(message: str) -> None:
        raise NotImplementedError

