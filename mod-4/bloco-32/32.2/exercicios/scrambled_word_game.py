from random import sample, choice


word_list = [
    'clandestine',
    'picturesque',
    'tectonic',
    'blasphemy',
    'exquisite',
    'serpentine',
]


chosen_word = choice(word_list)
scrambled_word = ''.join(sample(chosen_word, len(chosen_word)))


def main_loop():
    print('\n\n==== Scrambled word guesser! ====\n\n')
    print(f'Your word is:   {scrambled_word}\n')

    for chance in range(3, 0, -1):
        print(f'You have {chance} chance{"s" if chance > 1 else ""} left\n')
        user_shot = input('Guess:   ')
        if (user_shot == chosen_word):
            print('\nCongratulations!!!\n')
            break
        if (chance == 1):
            print(f'\nOh no... The word was {chosen_word}\n')
        else:
            print('\nUh oh... try again!\n')

    wants_to_play_again = input('Wanna play again? (y/n)   ')
    if (wants_to_play_again.lower() == 'y'):
        main_loop()


main_loop()
