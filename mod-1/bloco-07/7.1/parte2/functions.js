// Exemplo de solução em uma linha com recursividade
const getFactorialOneLiner = (n) => n === 1 ? n : n * (getFactorialOneLiner(n - 1));

console.log(getFactorialOneLiner(6));

// Exemplo de solução com loop
function getFactorial(n) {
  let rollingTotal = 1;

  for (let i = n; i > 0; i -= 1) {
    rollingTotal *= i;
  }

  return rollingTotal;
}

console.log(getFactorial(6));
