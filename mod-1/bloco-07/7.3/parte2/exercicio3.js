const assert = require('assert');

function sumAllNumbers(numberArray) {
  let sum = 0;

  for (let number of numberArray) {
    sum += number;
  }

  return sum;
}

const numbers = [9, 23, 10, 3, 8];
const expected = 53;
const output = sumAllNumbers(numbers);

assert.strictEqual(typeof sumAllNumbers, 'function');
assert.strictEqual(output, expected);