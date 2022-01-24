from pytest import raises
from email_validation import validate, ValidationError


def test_throws_validation_error_if_not_in_correct_format():
    with raises(ValidationError, match="Wrong email format"):
        validate('ugabuga.com')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@buga')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@buga.')
