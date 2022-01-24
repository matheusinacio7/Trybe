from email_validation import validate, ValidationError


def __is_valid(email):
    try:
        validate(email)
        return True
    except ValidationError:
        return False


def get_filtered(email_list):
    filtered_list = list(filter(__is_valid, email_list))
    return filtered_list
