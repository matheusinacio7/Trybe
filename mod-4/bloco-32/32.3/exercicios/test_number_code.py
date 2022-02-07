from number_code import decode
from pytest import raises


def test_decode_throws_error_with_invalid_characters():
    invalid_phrase_1 = '1-OB&*-PLEASE'
    with raises(TypeError,
                match='must only use letters, numbers 0 and 1 and hifen'):
        decode(invalid_phrase_1)

    invalid_phrase_2 = 'WHAT IS MY NAME'
    with raises(TypeError,
                match='must only use letters, numbers 0 and 1 and hifen'):
        decode(invalid_phrase_2)

    invalid_phrase_3 = ''
    with raises(TypeError, match='must not be an empty value'):
        decode(invalid_phrase_3)


def test_decode_returns_decoded_phrase():
    valid_phrase_1 = '1-HOME-SWEET-HOME'
    decoded_phrase_1 = '1-4663-79338-4663'

    assert(decode(valid_phrase_1)) == decoded_phrase_1

    valid_phrase_2 = 'MY-MISERABLE-JOB'
    decoded_phrase_2 = '69-647372253-562'

    assert(decode(valid_phrase_2)) == decoded_phrase_2
