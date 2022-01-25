# Rectangle class:
#   Attributes:
#     height: integer
#     width: integer
#
#   Getters:
#     area: integer
#     perimeter: integer

class Rectangle:
    def __init__(self, *, height, width):
        self.height = height
        self.width = width

    @property
    def area(self):
        return self.height * self.width

    @property
    def height(self):
        return self.height * 2 + self.width * 2
