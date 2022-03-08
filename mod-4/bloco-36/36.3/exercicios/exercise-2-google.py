employees = {
    1: [2, 3],
    2: [4],
    3: [],
    4: [5, 6],
    5: [7],
    6: [],
    7: [],
}


def get_score(employee_id: int):
    managees = employees[employee_id]

    if not len(managees):
        return 1

    return 1 + sum([get_score(managee) for managee in managees])


for i in range(1, 8):
    print(get_score(i))
