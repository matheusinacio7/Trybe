from .Logger import Logger


class TxtLogger(Logger):
    def log(message: str) -> None:
        return super().log()
