from HanoiTower import HanoiTower
from ConsoleRenderer import ConsoleRenderer
import sys

if __name__ == '__main__':
    number_of_disks = int(sys.argv[1] if len(sys.argv) > 1 else 3)
    my_tower = HanoiTower(number_of_disks, renderer=ConsoleRenderer())
    my_tower.solve()
