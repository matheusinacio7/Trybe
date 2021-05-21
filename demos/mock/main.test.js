const { describe, it, expect } = require('@jest/globals');

const { getGreetingString } = require('./main.js');
const { getAll, findOne, insertOne, removeOne, updateOne } = require('./bancoDeDadosMaisLentoDoMundo');

describe('A função getGreetingString', () => {
  describe('Quando o usuário é encontrado', () => {
    const expectedString = `Olá! Meu nome é Janete Corça e minha comida favorita é Sushi!
Qual a sua??`

    it('Retorna a frase correta', () => {
      return findOne((user) => user.name === 'Janete Corça')
        .then((user) => {
          expect(getGreetingString('Olá', user)).toBe(expectedString);
        });
    });
  });
});


