def get_longest_string(list):
    sorted_list = list.sort(key=len)
    return list[-1]


if (__name__ == '__main__'):
    print(get_longest_string(["José", "Lucas", "Nádia", "Fernanda", "Cairo", "Joana"]))

