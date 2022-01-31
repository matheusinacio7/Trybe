from my_logging.Logger import Logger


class ConsoleLogger(Logger):
    def log(self, message: str) -> None:
        print(message)


my_logger = ConsoleLogger()

my_logger.log('opa')
