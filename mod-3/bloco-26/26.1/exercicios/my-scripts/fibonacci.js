const { questionInt } = require('readline-sync');

const getFibonnaciSequenceArray = (target, array) => (
  array.length === target
    ? array
    : getFibonnaciSequenceArray(target, [...array, array[array.length - 1] + array[array.length - 2]])
);

function getTarget() {
  const target = questionInt('\nDigite um número inteiro entre 1 e 40.  ');

  if (target > 40 || target < 1) {
    console.log('\nDigite um numero entre 1 e 1000!');
    getTarget();
  } else {
    return target;
  }
}

function prompt() {
  console.log('\nCalculadora de Fibonacci!');
  console.log('\nEscolha quantos numeros voce quer ver');
  const target = getTarget();

  const array = getFibonnaciSequenceArray(target + 1, [0, 1]).slice(1);

  console.log('\nO resultado é:');
  console.log(array);
}

prompt();
