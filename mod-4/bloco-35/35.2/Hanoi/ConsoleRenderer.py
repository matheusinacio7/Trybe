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

        self._render_message()

        max_width = tower.number_of_disks
        top_to_bottom_lines = range(max_width - 1, -1, -1)

        for n in top_to_bottom_lines:
            self._write_line(tower=tower, line_num=n, max_width=max_width)

        self.console.write('\n')
        sleep(1.5)

    def _render_message(self):
        self.console.write(self.current_message + '\n\n')

    def _write_line(self,
                    tower: HanoiTower,
                    line_num: int,
                    max_width: int) -> None:
        spacing = '    '

        self.console.write(spacing)
        for peg in self._get_pegs(tower):
            self._render_peg(peg, line_num, max_width)
            self.console.write(spacing)

        self.console.write('\n')

    def _get_pegs(self, tower):
        max_width = tower.number_of_disks
        A: List[int] = list(tower.A['list'])
        B: List[int] = list(tower.B['list'])
        C: List[int] = list(tower.C['list'])

        A.extend([0] * (max_width - len(A)))
        B.extend([0] * (max_width - len(B)))
        C.extend([0] * (max_width - len(C)))
        return [A, B, C]

    def _render_peg(self, peg: List[int], line_num: int, max_width):
        peg_tokens = '**'
        peg_space = ' ' * (max_width - 1)

        if peg[line_num] == 0:
            self.console.write(peg_space + peg_tokens + peg_space)
        else:
            disk = '##' * peg[line_num]
            empty_space = ' ' * (max_width - peg[line_num])
            self.console.write(empty_space + disk + empty_space)

    def _clear(self) -> None:
        os.system('cls' if os.name == 'nt' else 'clear')
