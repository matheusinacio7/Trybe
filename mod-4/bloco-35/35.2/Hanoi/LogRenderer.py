from Renderer import Renderer
from HanoiTower import HanoiTower


class LogRenderer(Renderer):
    def render(self, tower: HanoiTower) -> None:
        A = tower.A
        B = tower.B
        C = tower.C

        print(A['list'],
              B['list'],
              C['list'],
              '==================================',
              sep='\n')

    def log(self, message: str):
        print(f'==== {message} ====')
