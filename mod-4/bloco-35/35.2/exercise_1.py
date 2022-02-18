#  Exercício 1: Crie um algoritmo não recursivo para contar quantos números pares existem em uma sequência numérica (1 a n).  # noqa: E501
from math import floor


def count_evens_up_to(n):
    rolling_sum = 0

    for i in range(1, n + 1):
        if i % 2 == 0:
            rolling_sum += 1

    return rolling_sum


print(count_evens_up_to(9))
print(count_evens_up_to(10))
print(count_evens_up_to(11))


def HACKED_count_evens_up_to(n):
    return floor(n / 2)


print(HACKED_count_evens_up_to(9))
print(HACKED_count_evens_up_to(10))
print(HACKED_count_evens_up_to(11))
