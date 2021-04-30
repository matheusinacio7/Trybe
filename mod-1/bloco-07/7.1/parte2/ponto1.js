/*
      ATENÇÃO

  Não se preocupe se você não entender os exemplos com recursividade ou os exemplos "one-liner";
  Normalmente não é uma boa prática esse tipo de código.
*/


// -------------- Fatorial -------------- //

// Exemplo de solução com loop
function getFactorial(n) {
  let rollingTotal = 1;

  for (let i = n; i > 0; i -= 1) {
    rollingTotal *= i;
  }

  return rollingTotal;
}

console.log(getFactorial(6));

// Exemplo de solução com recursividade
function getFactorialRecursive(n) {
  if (n === 1) {
    return n;
  } else {
    return n * getFactorialRecursive(n - 1);
  }
}

console.log(getFactorialRecursive(6));


// Exemplo de solução em uma linha com recursividade
const getFactorialOneLiner = (n) => n === 1 ? n : n * (getFactorialOneLiner(n - 1));

console.log(getFactorialOneLiner(6));
