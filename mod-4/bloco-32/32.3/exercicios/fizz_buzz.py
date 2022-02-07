def get_up_to_n(n):
    fizz_buzz_list = list(range(1, n + 1))
    for fizz in range(2, n + 1, 3):
        fizz_buzz_list[fizz] = 'Fizz'
    for fizz in range(4, n + 1, 5):
        fizz_buzz_list[fizz] = 'Buzz'
    for fizz in range(14, n + 1, 15):
        fizz_buzz_list[fizz] = 'FizzBuzz'

    print(fizz_buzz_list)
    return fizz_buzz_list
