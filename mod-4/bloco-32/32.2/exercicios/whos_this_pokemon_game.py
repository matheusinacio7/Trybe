import json
from random import choice, sample
from math import ceil


with open('pokemons.json') as file:
    pokemons_full_info = json.load(file)["results"]


pokemons = [(pokemon["national_number"], pokemon["name"].upper())
            for pokemon in pokemons_full_info]


def get_with_spaces(phrase):
    return ' '.join([char for char in phrase])


def substitute_with_underscores_except(phrase, non_underscore_indexes):
    phrase_chars = [char for char in phrase]
    underscored = ['_'] * len(phrase)
    for index in non_underscore_indexes:
        underscored[index] = phrase_chars[index]

    return ''.join(underscored)


def main_loop():
    random_pokemon = choice(pokemons)
    number, name = random_pokemon[0], random_pokemon[1]

    print('\n\n=== Who is this pokemon?? ===\n')

    indexes = list(range(len(name)))
    scrambled_indexes = sample(indexes, len(indexes))
    revealed_indexes = []

    for chance in range(ceil(len(name) / 2) + 1, 0, -1):
        print(f'You have {chance} chance{"s" if chance > 1 else ""} left\n')
        revealed = substitute_with_underscores_except(name, revealed_indexes)
        print(f'Pokemon {number}:   {get_with_spaces(revealed)}\n')
        guess = input('Your guess:   ')
        if (guess.upper() == name):
            print('\nCongratulations!!!\n')
            print(f'This is {name}!!\n')
            break
        if (chance == 1):
            print(f'\nOh no... The pokemon was {name}\n')
        else:
            print('\nUh oh... Here, have a tip:\n')
            revealed_indexes.append(scrambled_indexes.pop())

    wants_to_play_again = input('Wanna play again? (y/n)   ')
    if (wants_to_play_again.lower() == 'y'):
        main_loop()


main_loop()
