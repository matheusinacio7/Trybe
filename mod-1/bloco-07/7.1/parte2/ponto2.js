/*
      ATENÇÃO

  Não se preocupe se você não entender os exemplos com recursividade ou os exemplos "one-liner";
  Normalmente não é uma boa prática esse tipo de código.
*/

// -------------- Pegar a palavra mais longa -------------- //

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
