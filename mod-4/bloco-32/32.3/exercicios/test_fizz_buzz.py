from fizz_buzz import get_up_to_n


def test_get_up_to_n_substitutes_correctly():
    fizz_buzz_list = get_up_to_n(31)
    for i in range(1, 32):
        if (i % 3 == 0 and i % 5 == 0):
            assert(fizz_buzz_list[i] == 'FizzBuzz')
        elif (i % 3):
            assert(fizz_buzz_list[i] == 'Fizz')
        elif (i % 5):
            assert(fizz_buzz_list[i] == 'Buzz')
        else:
            assert(fizz_buzz_list[i] == i)
