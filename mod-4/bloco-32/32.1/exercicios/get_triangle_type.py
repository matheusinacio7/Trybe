def can_form_triangle(sides):
    if (len(sides) != 3):
        return False

    sorted_sides = sorted(sides)

    if (sorted_sides[0] + sorted_sides[1] > sorted_sides[2]):
        return True
    else:
        return False


def get_triangle_type(sides):
    if not (can_form_triangle(sides)):
        return 'Não é triângulo'

    unique_side_count = len(set(sides))

    if (unique_side_count == 1):
        return "Triângulo Escaleno"
    elif (unique_side_count == 2):
        return "Triângulo Isoscéles"
    else:
        return "Triângulo Equilátero"


if (__name__ == '__main__'):
    print(can_form_triangle([16, 20, 30]))
    print(can_form_triangle([5, 15, 20]))
    print(get_triangle_type([3, 6, 10]))
    print(get_triangle_type([10, 10, 10]))
    print(get_triangle_type([10, 10, 19]))
    print(get_triangle_type([9, 13, 20]))
