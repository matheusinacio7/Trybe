def get_as_natural(string):
    try:
        as_float = float(string)
    except Exception:
        raise TypeError('Must be a number')
    else:
        if not (as_float.is_integer()):
            raise TypeError('Number must be an integer')

        if (as_float < 0):
            raise TypeError('Number must be larger than zero')

        return int(as_float)


def sum_natural_numbers(string_list):
    naturals = map(get_as_natural, string_list)
    return sum(naturals)


if (__name__ == '__main__'):
    string_input = input('Insert natural numbers separated by space:\n')
    string_list = string_input.split()
    try:
        result = sum_natural_numbers(string_list)
        print(f'The result is {result}')
    except TypeError:
        print('Not possible to parse the requested input')
    except Exception:
        print('Unexpected error')
