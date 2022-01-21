def print_string_in_vertical(string):
    uppercased = string.upper()
    for char in uppercased:
        print(char)


if (__name__ == '__main__'):
    user_input = input('Enter a string:  ')
    print_string_in_vertical(user_input)
