#  Exercício 3: Crie um algoritmo recursivo que encontre, em uma lista, o maior número inteiro.  # noqa: E501
from typing import List


def get_highest_number_from(numbers: List[int]):
    highest_from_last_two = (numbers[-1] if numbers[-1] > numbers[-2]
                             else numbers[-2])

    if len(numbers) == 2:
        return highest_from_last_two

    new_list = numbers[:-2]
    new_list.append(highest_from_last_two)

    return get_highest_number_from(new_list)


print(get_highest_number_from([2, 1, 1, -1, 0]))
print(get_highest_number_from([2, 1, 5, 3, 4]))
print(get_highest_number_from([2, 1, 5, 3, 4, 10]))
