const { test, expect } = require('@jest/globals');
const { searchEmployee, professionalBoard } = require('./searchEmployee');

test('Função existe', () => {
  expect(typeof searchEmployee).toBe('function');
});

test('Retorna erro quando o id não é encontrado', () => {
  expect(() => searchEmployee('8491-8')).toThrowError(new Error('ID não encontrada.'));
});
