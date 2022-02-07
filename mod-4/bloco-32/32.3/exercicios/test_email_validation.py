from pytest import raises
from email_validation import validate, ValidationError


def test_throws_validation_error_if_not_in_correct_format():
    with raises(ValidationError, match="Wrong email format"):
        validate('ugabuga.com')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@buga')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@buga.')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@&uga.com')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@_buga.com')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@buga.cooom')
    with raises(ValidationError, match="Wrong email format"):
        validate('uga@buga.')


def test_returns_true_with_correct_format():
    assert(validate('uga@buga.com')) is True
    assert(validate('ug4@bug4.net')) is True
