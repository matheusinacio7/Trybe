import time

# Exercício 1: Qual a Ordem de Complexidade (complexidade de tempo) do algoritmo abaixo? E a complexidade de espaço? # noqa: E501


def multiply_array(numbers):
    result = 0
    for number in numbers:
        result *= number

    return result

# Tempo: O(n) Espaço: O(1)


def multiply_arrays(array1, array2):
    result = []
    for number1 in array1:
        for number2 in array2:
            result.append(number1 + number2)

    return result


# Exercício 2: Para desembaraçar a sopa de letrinhas que a seção anterior criou, meça o tempo de execução do algoritmo acima e, mudando o tamanho das entradas, veja como, se você aumenta a entrada em n vezes, o tempo de execução aumenta em n² vezes! # noqa: E501
start = time.time()
big_array = list(range(2000))
multiply_arrays(big_array, big_array)
end = time.time()
print('o2 2000', end - start)

start = time.time()
bigger_array = list(range(4000))
multiply_arrays(bigger_array, bigger_array)
end = time.time()
print('o2 4000', end - start)


#  Exercício 3: Faça um algoritmo qualquer com três loops aninhados um dentro do outro. Entenda como ele terá uma complexidade de O(n³) ! # noqa: E501

def sum_arrays(arr1, arr2, arr3):
    final_array = []

    for i in arr1:
        for j in arr2:
            for k in arr3:
                final_array.append(i + j + k)


start = time.time()
big_array = list(range(100))
sum_arrays(big_array, big_array, bigger_array)
end = time.time()
print('o3 2000', end - start)

start = time.time()
bigger_array = list(range(200))
sum_arrays(bigger_array, bigger_array, bigger_array)
end = time.time()
print('o3 4000', end - start)
