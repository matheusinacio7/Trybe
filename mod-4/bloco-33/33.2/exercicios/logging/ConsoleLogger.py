from .Logger import Logger


class ConsoleLogger(Logger):
    def log(message: str) -> None:
        return super().log()
