#  Exercício 4: Escreva um algoritmo recursivo para encontrar o máximo divisor comum ( mdc ) de dois inteiros.  # noqa: E501
from math import floor


def get_maximum_common_divisor_recursion(smaller, larger, max, last_try):
    if (floor(smaller / 2) in {max, last_try}):
        return max

    next_try = last_try + 1
    if (smaller % next_try == 0):
        max_current = smaller / next_try
        if (larger % max_current == 0):
            max = max_current

    return get_maximum_common_divisor_recursion(smaller, larger, max, next_try)


def get_maximum_common_divisor(n: int, m: int):
    if (m > n):
        larger = m
        smaller = n
    else:
        larger = n
        smaller = m

    return int(get_maximum_common_divisor_recursion(smaller, larger, 1, 0))


print(get_maximum_common_divisor(100, 40))
print(get_maximum_common_divisor(100, 8))
print(get_maximum_common_divisor(125, 3))
