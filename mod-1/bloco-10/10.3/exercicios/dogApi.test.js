const { describe, it, expect } = require('@jest/globals');
let { getRandomDogPicture } = require('./dogApi');

describe('fn getRandomDogPicture,', () => {
  describe('quando bem sucedida:', () => {
    it('Retorna a mensagem de sucesso', () => {
      getRandomDogPicture = jest.fn().mockReturnValueOnce('request success');
      expect(getRandomDogPicture()).toBe('request success');
    });
  });

  describe('quando mal sucedida:', () => {
    it('Retorna uma mensagem de erro', () => {
      getRandomDogPicture.mockReturnValueOnce('request failed');
      expect(getRandomDogPicture()).toBe('request failed');
    });
  });
});
