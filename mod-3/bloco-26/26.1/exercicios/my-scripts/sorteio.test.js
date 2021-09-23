const { expect, describe, it } = require('@jest/globals');
const { getRandomInt } = require('./sorteio');

describe('A função getRandomInt, quando fornecida 0 a 10, retorna', () => {
  it('no máximo 10', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.999999);

    expect(getRandomInt(0, 10)).toBe(10);
  });

  it('no mínimo 0', () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.000001);

    expect(getRandomInt(0, 10)).toBe(0);
  });
});
