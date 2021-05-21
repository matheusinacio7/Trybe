const { describe, it, expect } = require('@jest/globals');
let { getRandomIntUpTo100 } = require('./main');

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
});
