def get_sum_up_to(n):
    list_up_to_n = list(range(1, n + 1))
    return sum(list_up_to_n)


if (__name__ == '__main__'):
    print(get_sum_up_to(5))
