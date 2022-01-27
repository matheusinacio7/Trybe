class TV:
    def __init__(self, size: str):
        self._size = size
        self._volume: int = 50
        self._channel: int = 1
        self._isOn: bool = False

    def increase_volume(self):
        self._volume = min(99, self._volume + 1)
