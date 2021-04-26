/*
      ATENÇÃO

  Não se preocupe se você não entender os exemplos com recursividade ou os exemplos "one-liner";
  Normalmente não é uma boa prática esse tipo de código.
*/


// -------------- Primeira função -------------- //

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


// -------------- Segunda função -------------- //

function getLongestWord(phrase) {
  const wordArray = phrase.split(' ');

  // O sort abaixo retorna o array de palavras em ordem decrescente de tamanho
  const sortedWordArray = wordArray.sort((a, b) => b.length - a.length);

  return sortedWordArray[0];
}

console.log(getLongestWord('Antônio foi ao banheiro rindo descontroladamente e não sabemos o que aconteceu'));

// Exemplo de solução em uma linha
const getLongestWordOneLiner = (phrase) => phrase.split(' ').sort((a, b) => b.length - a.length)[0];

console.log(getLongestWordOneLiner('Antônio foi ao banheiro rindo descontroladamente e não sabemos o que aconteceu'));
