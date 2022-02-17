from statistics import mean, median, mode


class Statistics:
    def __init__(self, initial_list=[]):
        self._number_list = initial_list

    def getMean(self):
        return mean(self._number_list)

    def getMedian(self):
        return median(self._number_list)

    def getMode(self):
        return mode(self._number_list)
