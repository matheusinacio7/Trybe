const assert = require('assert');

function myRemoveWithoutCopy(arr, item) {
  for (let index = 0, len = arr.length; index < len; index += 1) {
    if (arr[index] === item) {
      arr.splice(index, 1);
      index -= 1;
      len -= 1;
    }
  }

  return arr;
}

let originalArray = [1, 2, 3, 4];
assert.strictEqual(myRemoveWithoutCopy(originalArray, 3), originalArray);
assert.deepStrictEqual(myRemoveWithoutCopy(originalArray, 3), [1, 2, 4]);

originalArray = [1, 2, 3, 4];
assert.strictEqual(myRemoveWithoutCopy(originalArray, 3), originalArray);
assert.notDeepStrictEqual(myRemoveWithoutCopy(originalArray, 3), [1, 2, 3, 4]);

originalArray = [1, 2, 3, 4];
assert.strictEqual(myRemoveWithoutCopy(originalArray, 5), originalArray);
assert.deepStrictEqual(myRemoveWithoutCopy(originalArray, 5), [1, 2, 3, 4]);
