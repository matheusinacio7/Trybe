letter_to_number_map = {
    "A": "2",
    "B": "2",
    "C": "2",
    "D": "3",
    "E": "3",
    "F": "3",
    "G": "4",
    "H": "4",
    "I": "4",
    "J": "5",
    "K": "5",
    "L": "5",
    "M": "6",
    "N": "6",
    "O": "6",
    "P": "7",
    "Q": "7",
    "R": "7",
    "S": "7",
    "T": "8",
    "U": "8",
    "V": "8",
    "W": "9",
    "X": "9",
    "Y": "9",
    "Z": "9",
    "-": "-",
    "0": "0",
    "1": "1",
}


def decode(phrase):
    if (phrase == ''):
        raise TypeError('must not be an empty value')

    chars = [char for char in phrase]
    for i in range(len(chars)):
        if not (chars[i] in letter_to_number_map):
            raise TypeError('must only use letters, numbers 0 and 1 and hifen')
        chars[i] = letter_to_number_map[chars[i]]

    return ''.join(chars)
