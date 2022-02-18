#  Exercício 2: Transforme o algoritmo criado acima em recursivo.

def get_even_count_up_to(n):
    if n == 1:
        return 0

    count_increase = 1 if n % 2 == 0 else 0

    return count_increase + get_even_count_up_to(n - 1)


print(get_even_count_up_to(9))
print(get_even_count_up_to(10))
print(get_even_count_up_to(11))
