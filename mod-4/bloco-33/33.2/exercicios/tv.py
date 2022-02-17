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

    def change_channel(self, channel: int):
        if not 1 <= channel <= 99:
            raise ValueError(('Channel must be between 1 and 99. '
                             f'Received: {channel}'))

        self._channel = channel

    def toggle_on(self):
        self._isOn = not self._isOn
