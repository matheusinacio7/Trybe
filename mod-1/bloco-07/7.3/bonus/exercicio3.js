const assert = require('assert');

function removeMiddle(array) {
  const middleIndex = Math.ceil((array.length - 1 )/ 2);
  return array.splice(middleIndex, 1);
}

const words = ['mouse', 'giraffe', 'queen', 'window', 'bottle'];
const expectedWords = ['mouse', 'giraffe', 'window', 'bottle'];
const expectedOutput = ['queen'];
const output = removeMiddle(words);

assert.deepStrictEqual(output, expectedOutput);
assert.deepStrictEqual(words, expectedWords);
