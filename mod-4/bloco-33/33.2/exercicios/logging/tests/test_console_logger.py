from ...logging import ConsoleLogger


def test_prints_to_the_console(capsys):
    my_logger = ConsoleLogger()

    captured = capsys.readouterr()
    my_logger.log('You know my name')

    assert captured.out == 'You know my name'
