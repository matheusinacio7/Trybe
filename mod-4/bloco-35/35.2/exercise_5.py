#  Exercício 5: Escreva um algoritmo recursivo que identifica se um número é primo.  # noqa: E501
def get_is_prime_recursion(target: int, last_try: int):
    next_try = last_try + 2

    if (next_try > target / 3):
        return True

    if (target % next_try == 0):
        return False

    return True and get_is_prime_recursion(target, next_try)


def get_is_prime(n: int):
    if (n % 2 == 0):
        return False

    return get_is_prime_recursion(n, 1)


primes = [41, 43, 79, 83, 89, 97]
non_primes = [10, 14, 88, 27, 49]

for prime in primes:
    print('prime', prime, get_is_prime(prime))


for non_prime in non_primes:
    print('non_prime', non_prime, get_is_prime(non_prime))
