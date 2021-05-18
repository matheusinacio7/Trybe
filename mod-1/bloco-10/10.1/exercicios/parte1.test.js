const { expect } = require('@jest/globals');
const { sum } = require('./parte1');

test('Realiza somas corretamente.', () => {
  expect(sum(4, 5)).toBe(9);
  expect(sum(0, 0)).toBe(0);
  expect(() => sum(4, '5')).toThrow();
  expect(() => sum(4, '5')).toThrowError(new Error('parameters must be numbers'));
});


