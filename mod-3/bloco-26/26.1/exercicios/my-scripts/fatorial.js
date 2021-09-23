const { questionInt } = require('readline-sync');

const getFactorialRecursive = (next, accumulator) => next === 1 ? accumulator : getFactorialRecursive(next - 1, accumulator * next);

function getTarget() {
  const target = questionInt('\nDigite um número inteiro entre 1 e 1000.  ');

  if (target > 1000 || target < 1) {
    console.log('\nDigite um numero entre 1 e 1000!');
    getTarget();
  } else {
    return target;
  }
}

function prompt() {
  console.log('\nCalculadora de Fatorial!');

  const target = getTarget();

  const factorial = getFactorialRecursive(target, 1);

  console.log(`O fatorial de ${target} é ${factorial}.`);
}

prompt();
