from re import fullmatch


class ValidationError(Exception):
    def __init__(self, message="Validation error", *, errors=[]):
        self.errors = errors
        super().__init__(message)


def validate_format(email):
    if fullmatch(r'[a-zA-Z][\w-]+@[a-zA-Z\d]+\..{1,3}', email) is None:
        raise ValidationError("Wrong email format.")


def validate(email):
    validate_format(email)
