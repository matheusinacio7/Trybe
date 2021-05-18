const { test, expect } = require('@jest/globals');
const { searchEmployee } = require('./searchEmployee');

test('Função existe', () => {
  expect(typeof searchEmployee).toBe('function');
});

test('Retorna erro quando o id não é encontrado', () => {
  expect(() => searchEmployee('8491-9')).toThrowError(new Error('ID não encontrada.'));
});

test('Retorna as informações corretas quando encontra um match.', () => {
  
});
