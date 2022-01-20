def print_star_square(n):
    for line in range(0, n):
        star_line = ''
        for column in range(0, n):
            star_line += '*'
        print(star_line)

if (__name__ == '__main__'):
    print_star_square(5)
    print_star_square(3)
    print_star_square(8)
