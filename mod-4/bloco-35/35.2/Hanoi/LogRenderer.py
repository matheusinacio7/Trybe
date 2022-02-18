from Renderer import Renderer


class LogRenderer(Renderer):
    def render(self, tower) -> None:
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
