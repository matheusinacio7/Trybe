def print_as_vertical_inverted_triangle(string):
    uppercased = string.upper()
    for index in range(len(uppercased), 0, -1):
        print(uppercased[:index])


if (__name__ == '__main__'):
    user_input = input('Enter a word:  ')
    print('\n\n')
    print_as_vertical_inverted_triangle(user_input)
