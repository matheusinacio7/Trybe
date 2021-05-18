const { test, expect } = require('@jest/globals');
const searchEmployee = require('./searchEmployee');

test('Função existe', () => {
  expect(typeof searchEmployee).toBe('function');
});


