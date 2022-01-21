MIN_GRADE = 6


def get_non_approved_students(student_list):
    return [student
            for student in student_list
            if student['grade'] < MIN_GRADE]


if (__name__ == '__main__'):
    with open('student_grades.txt') as file:
        student_lines = file.read().splitlines()
        student_lines = [line.split() for line in student_lines]

    def get_student_dict_from_line(line):
        return {'name': line[0], 'grade': int(line[1])}

    student_list = list(map(get_student_dict_from_line, student_lines))

    non_approved_students = get_non_approved_students(student_list)

    with open('non_approved_students.txt', mode='w') as file:
        for student in non_approved_students:
            file.write(f'{student["name"]}\n')
