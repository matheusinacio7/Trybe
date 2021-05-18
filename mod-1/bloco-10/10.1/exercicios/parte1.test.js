const { expect, test } = require('@jest/globals');
const { sum, myRemove, myRemoveWithoutCopy, myFizzBuzz } = require('./parte1');

test('Realiza somas corretamente.', () => {
  expect(sum(4, 5)).toBe(9);
  expect(sum(0, 0)).toBe(0);
  expect(() => sum(4, '5')).toThrow();
  expect(() => sum(4, '5')).toThrowError(new Error('parameters must be numbers'));
});

test('Remove elemento do array corretamente', () => {
  const originalArray = [1, 2, 3, 4];
  expect(myRemove(originalArray, 3)).toEqual([1, 2, 4]);
  expect(originalArray).toEqual([1, 2, 3, 4]);
  expect(myRemove(originalArray, 5)).toEqual([1, 2, 3, 4]);
});

test('Remove elemento do array inplace corretamente', () => {
  const originalArray = [1, 2, 3, 4];
  expect(myRemoveWithoutCopy(originalArray, 3)).toEqual([1, 2, 4]);
  expect(originalArray).toEqual([1, 2, 4]);
  expect(myRemoveWithoutCopy([1, 2, 3, 4], 5)).toEqual([1, 2, 3, 4]);
});

test('Retorna fizzbuzz corretamente', () => {
  expect(myFizzBuzz(30)).toBe('fizzbuzz');
  expect(myFizzBuzz(9)).toBe('fizz');
  expect(myFizzBuzz(20)).toBe('buzz');
  expect(myFizzBuzz(14)).toBe(14);
  expect(myFizzBuzz('drown the king HAHAHAHAHA')).toBe(false);
})

