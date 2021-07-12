const assert = require('assert');

function wordLengths(wordArray) {
  const wordLengthArray = [];

  for (let word of wordArray) {
    wordLengthArray.push(word.length);
  }

  return wordLengthArray;
}

const words = ['sun', 'potato', 'roundabout', 'pizza'];
const expected = [3, 6, 10, 5];

assert.strictEqual(typeof wordLengths, 'function');
const output = wordLengths(words);
assert.deepStrictEqual(output, expected);
