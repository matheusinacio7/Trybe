from Renderer import Renderer
from typing import TextIO, List
from sys import stdout
from time import sleep
from HanoiTower import HanoiTower
import os


class ConsoleRenderer(Renderer):
    def __init__(self, clear: bool = False, console: TextIO = stdout) -> None:
        self.current_message = ''
        self.should_clear = clear
        self.console = console

    def log(self, message: str) -> None:
        self.current_message = message

    def render(self, tower: HanoiTower) -> None:
        if (self.should_clear):
            self.clear()

        max_width = tower.number_of_disks
        A: List[int] = list(tower.A['list'])
        B: List[int] = list(tower.B['list'])
        C: List[int] = list(tower.C['list'])

        A.extend([0] * (max_width - len(A)))
        B.extend([0] * (max_width - len(B)))
        C.extend([0] * (max_width - len(C)))

        self.console.write(self.current_message + '\n\n')
        spacing = '    '
        peg = '**'
        peg_space = ' ' * (max_width - 1)
        for n in range(max_width - 1, -1, -1):
            self.console.write(spacing)
            for filled_peg in [A, B, C]:
                if filled_peg[n] == 0:
                    self.console.write(peg_space + peg + peg_space)
                else:
                    disk = '##' * filled_peg[n]
                    empty_space = ' ' * (max_width - filled_peg[n])
                    self.console.write(empty_space + disk + empty_space)
                self.console.write(spacing)

            self.console.write('\n')

        self.console.write('\n')
        sleep(1.5)

    def clear(self) -> None:
        os.system('cls' if os.name == 'nt' else 'clear')
