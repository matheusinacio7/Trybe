const assert = require('assert');

function getChange(payable, paid) {
  const coins = [200, 100, 50, 20, 10, 5, 2, 1];
  const change = [];
  let remaining = paid - payable;

  if (remaining < 0) {
    throw new Error('paid value is not enough');
  }

  let currentCoinIndex = 0;
  while (remaining && currentCoinIndex < coins.length) {
    if (remaining - coins[currentCoinIndex] >= 0) {
      remaining -= coins[currentCoinIndex];
      change.push(coins[currentCoinIndex]);
    } else {
      currentCoinIndex += 1;
    }
  }

  return change;
}

let result = getChange(1, 1); // no change/coins just an empty array
let expected = [];
assert.deepStrictEqual(result, expected);

result = getChange(215, 300); // expect an array containing [50, 20, 10, 5]
expected = [50, 20, 10, 5];
assert.deepStrictEqual(result, expected);

result = getChange(486, 600); // expect an array containing [100, 10, 2, 2]
expected = [100, 10, 2, 2];
assert.deepStrictEqual(result, expected);

result = getChange(12, 400); // expect an array containing [200, 100, 50, 20, 10, 5, 2, 1]
expected = [200, 100, 50, 20, 10, 5, 2, 1];
assert.deepStrictEqual(result, expected);

assert.throws(() => { getChange(100, 10); }, /^Error: paid value is not enough$/);
