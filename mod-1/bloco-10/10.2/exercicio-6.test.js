const { it, expect } = require('@jest/globals');
const { getAnimal, getAnimalsByAge } = require('./exercicio-6');

describe('Testando promise - findAnimalByName', () => {
  describe('Quando existe o animal com o nome procurado', () => {
    test('Retorne o objeto do animal', () => {
      expect.assertions(1);
      return getAnimal('Dorminhoco').then(animal => {
        expect(animal).toEqual({ name: 'Dorminhoco', age: 1, type: 'Dog' });
      });
    });
  });

  describe('Quando não existe o animal com o nome procurado', () => {
    test('Retorna um erro', () => {
      expect.assertions(1);
      return getAnimal('Bob').catch(error =>
        expect(error).toEqual('Nenhum animal com esse nome!')
      );
    });
  });
});

describe('getAnimalsByAge', () => {
  describe('Quando encontra animais', () => {
    const oneYearOldAnimals = [
      { name: 'Dorminhoco', age: 1, type: 'Dog' },
      { name: 'Amimir', age: 1, type: 'Cat '},
    ]
    it('Retorna um array com os animais encontrados', () => {
      return expect(getAnimalsByAge(1)).resolves.toEqual(oneYearOldAnimals);
    });
  });

  describe('Quando não encontra animais', () => {
    it('Retorna um erro', () => {
      return expect(getAnimalsByAge(10)).rejects.toEqual({ error: 'Nenhum animla tem essa idade.' });
    });
  });
})
