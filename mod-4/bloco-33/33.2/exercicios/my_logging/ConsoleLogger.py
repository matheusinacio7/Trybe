from .Logger import Logger


class ConsoleLogger(Logger):
    def log(self, message: str) -> None:
        print(message)
