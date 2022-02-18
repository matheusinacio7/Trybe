# Exercício 5 Utilize o módulo random da linguagem Python para gerar um array com 100 números. Cada um desses números deve ser a média de dez números gerados aleatóriamente. Qual é a ordem de complexidade de tempo e de espaço deste programa? # noqa: E501
from random import randrange
from functools import reduce


def get_random_average():
    base_list = [randrange(1, 10) for n in range(10)]
    return reduce(lambda a, b: a + b, base_list) / 10


def get_random_number_list():
    return [get_random_average() for n in range(100)]

# Complexidade. Tempo: O(1). Espaço: O(1). O programa não possui entrada.
