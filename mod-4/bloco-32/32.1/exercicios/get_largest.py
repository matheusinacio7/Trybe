def get_largest (a, b):
    return a if a >= b else b

if (__name__ == '__main__'):
    print(get_largest(1, 5))
    print(get_largest(8, 3))
    print(get_largest(3, 3))
