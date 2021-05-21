const { describe, it, expect } = require('@jest/globals');
let { getRandomIntUpTo100, concatTwoStrings, getFirstChar, uppercaseString } = require('./main');

describe('A função getRandomIntUpTo100', () => {
  getRandomIntUpTo100 = jest.fn().mockReturnValue(10);

  it('É chamada e retorna 10 (??)', () => {
    expect(getRandomIntUpTo100()).toBe(10);
    expect(getRandomIntUpTo100).toHaveBeenCalledTimes(1);
  });

  it('Retorna a divisão de dois valores um pelo outro', () => {
    getRandomIntUpTo100 = getRandomIntUpTo100.mockImplementationOnce((a, b) => a / b);
    expect(getRandomIntUpTo100(28, 7)).toBe(4);
    expect(getRandomIntUpTo100()).toBe(10);
  });

  it('Retorna a multiplicação de três parâmetros', () => {
    getRandomIntUpTo100 = getRandomIntUpTo100.mockImplementation((a, b, c) => a * b * c);
    expect(getRandomIntUpTo100(3, 2, 5)).toBe(30);
    expect(getRandomIntUpTo100(4, 4, 2)).toBe(32);
  });

  it('Retorna o dobro de um parâmetro', () => {
    getRandomIntUpTo100.mockReset();
    getRandomIntUpTo100 = getRandomIntUpTo100.mockImplementation((num) => num * 2);
    expect(getRandomIntUpTo100(10)).toBe(20);
    expect(getRandomIntUpTo100(35)).toBe(70);
  });
});

describe('A função uppercaseString', () => {
  uppercaseString = jest.fn((str) => str.toLowerCase());

  it('Transforma uma string em lower case', () => {
    expect(uppercaseString('DESTRUA A COROA')).toBe('destrua a coroa');
    expect(uppercaseString('o rEi estÁ mORTo')).toBe('o rei está morto');
  });
});

describe('A função getFirstChar', () => {
  getFirstChar = jest.fn((str) => str[str.length - 1]);

  it('Retorna o último caractere de uma string', () => {
    expect(getFirstChar('Péssima escolha de palavras')).toBe('s');
    expect(getFirstChar('Eu pareço um cara com um plano?')).toBe('?');
  });
});

describe('A função concatTwoStrings', () => {
  concatTwoStrings = jest.fn((str1, str2, str3) => str1 + str2 + str3);

  it('Concatena três strings', () => {
    expect(concatTwoStrings('If you', '\'re good at something', ', never do it for free.'))
      .toBe('If you\'re good at something, never do it for free.');
  });
});
