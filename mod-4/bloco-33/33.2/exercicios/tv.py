class TV:
    def __init__(self, size: str):
        self.size = size
        self.volume: int = 50
        self.channel: int = 1
        self.isOn: bool = False

    def increase_volume(self):
        self.volume += 1
