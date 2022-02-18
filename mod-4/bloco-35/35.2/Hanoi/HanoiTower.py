from typing import List, TypedDict


class Peg(TypedDict):
    name: str
    list: List[int]


class HanoiTower:
    def __init__(self, number_of_disks: int):
        self.A: Peg = {
            'name': 'A',
            'list': list(range(number_of_disks, 0, -1)),
        }
        self.B: Peg = {
            'name': 'B',
            'list': [],
        }
        self.C: Peg = {
            'name': 'C',
            'list': [],
        }
        self.number_of_disks = number_of_disks

    def solve(self):
        self.move(self.A, self.C, self.B, self.number_of_disks)

    def move(self, source: Peg, target: Peg, spare: Peg, disks: int):
        if (disks == 0):
            return

        self.move(source, spare, target, disks - 1)

        disk = source['list'].pop()
        self.log(f'Moving disk {disk} ' +
                 f'from {source["name"]} to {target["name"]}')
        target['list'].append(disk)
        self.render()

        self.move(spare, target, source, disks - 1)

    def log(self, message):
        print(f'=== {message} ===')

    def render(self):
        print(self.A['list'],
              self.B['list'],
              self.C['list'],
              '==================================',
              sep='\n')


if __name__ == '__main__':
    my_tower = HanoiTower(5)
    my_tower.solve()

# print('k')
