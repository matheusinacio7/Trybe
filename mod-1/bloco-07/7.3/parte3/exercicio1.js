const assert = require('assert');

const greetPeople = (people) => {
  if (!Array.isArray(people)) {
    throw new Error('parameter must be an array of strings');
  }

  let greeting = 'Hello ';
  const greetingArray = [];

  for (const person of people) {
    if (typeof person !== 'string') {
      throw new Error('parameter must be an array of strings');
    }

    greetingArray.push(greeting + person);
  }
  return greetingArray;
};

const parameter = ['Irina', 'Ashleigh', 'Elsa'];
const result = ['Hello Irina', 'Hello Ashleigh', 'Hello Elsa'];

assert.deepStrictEqual(greetPeople(parameter), result);
assert.throws(() => {
  greetPeople('John');
}, /^Error: parameter must be an array of strings$/);;

assert.throws(() => {
  greetPeople(['John', true]);
}, /^Error: parameter must be an array of strings$/);;
