const assert = require('assert');

const removeVowels = (word) => {
  if (typeof word !== 'string') {
    throw new Error('parameter must be a string');
  }

  let result = '';
  let count = 1;

  for (let index = 0; index < word.length; index += 1) {
    if (
      word[index] === 'a' ||
      word[index] === 'o' ||
      word[index] === 'i' ||
      word[index] === 'e' ||
      word[index] === 'u'
    ) {
      result += count.toString(10);
      count += 1;
    } else {
      result += word[index];
    }
  }
  return result;
};

const parameter = 'Dayane';
const result = 'D1y2n3';

assert.strictEqual(removeVowels(parameter), result);

assert.throws(() => {
  removeVowels(['J', 'o', 'h', 'n']);
}, /^Error: parameter must be a string$/);
