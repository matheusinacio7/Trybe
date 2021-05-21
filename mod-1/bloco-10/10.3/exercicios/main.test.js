const { describe, it, expect } = require('@jest/globals');
let { getRandomIntUpTo100 } = require('./main');

describe('A função getRandomIntUpTo100', () => {
  getRandomIntUpTo100 = jest.fn().mockReturnValue(10);

  it('É chamada e retorna 10 (??)', () => {
    expect(getRandomIntUpTo100()).toBe(10);
    expect(getRandomIntUpTo100).toHaveBeenCalledTimes(1);
  });
});
