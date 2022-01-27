class TV:
    def __init__(self, size: str):
        self._size = size
        self._volume: int = 50
        self._channel: int = 1
        self._isOn: bool = False

    def increase_volume(self):
        self._volume = min(99, self._volume + 1)

    def decrease_volume(self):
        self._volume = max(0, self._volume - 1)

    def change_channel(self, channel: str):
        raise NotImplementedError

    def toggle_on():
        raise NotImplementedError
