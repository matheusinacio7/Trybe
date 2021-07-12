const { expect } = require('@jest/globals');
const uppercase = require('./exercicio-1');

test('uppercase - Converte string para maiúsculas.', (done) => {
  setTimeout(() => {
    uppercase('bom dia, pessoal', (transformedString) => {
      expect(transformedString).toBe('BOM DIA, PESSOAL');
      done();
    });
  }, 200);
})
