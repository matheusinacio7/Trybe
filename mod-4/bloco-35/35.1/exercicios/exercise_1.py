#  Exercício 1 Dado um array de números de tamanho n , escreva um algoritmo que retorna true se há no array um número duplicado e false caso contrário. # noqa: E501
def get_contains_duplicate(numbers):
    uniques = set(numbers)
    return len(uniques) != len(numbers)

# Acima: Todos os casos: O(n). É preciso percorrer o array inteiro para criar o set a partir dele. Depois apenas uma operação de comparação de tamanho é feita # noqa: E501


print(get_contains_duplicate([1, 2, 3, 4, 5]))
print(get_contains_duplicate([1, 2, 3, 4, 5, 5, 6, 7]))


# Analise a solução abaixo e diga qual é a ordem de complexidade desse algoritmo para o melhor caso, pior caso e caso médio.   # noqa: E501
def contains_duplicate(numbers):
    numbers.sort()
    previous_number = 'not a number'
    for number in numbers:
        if(previous_number == number):
            return True
        previous_number = number

    return False
# Acima:
#   Pior caso: O(n^2). É preciso percorrer o array uma vez para ordená-lo, e depois mais uma vez até o final para encontrar um número não duplicado. Este caso acontece tanto quando não há duplicatas quanto quando o número duplicado é o maior do conjunto. # noqa: E501
#   Caso médio: O(n + n/2)?
#   Melhor caso: O(n) -> ordenar o array e depois encontrar o número duplicado na primeira posição # noqa: E501
# Resposta: O algoritmo de ordenação do python tem complexidade n log(n)
