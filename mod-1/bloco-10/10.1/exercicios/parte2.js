function encode(sentence) {
  let encodedSentence = '';

  for (let char of sentence) {
    if (cryptoDictionary[char]) {
      encodedSentence += cryptoDictionary[char];
    } else {
      encodedSentence += char;
    }
  }

  return encodedSentence;
}

function decode(sentence) {
  let decodedSentence = '';

  for (let char of sentence) {
    if (parseInt(char, 10) < 6 && parseInt(char, 10) > 0) {
      decodedSentence += cryptoDictionary[parseInt(char, 10)];
    } else {
      decodedSentence += char;
    }
  }

  return decodedSentence;
}

function hydrate(orderString) {
  let countArray = orderString.match(/\d+/g);

  countArray = countArray.map((count) => parseInt(count, 10));

  let totalCount = countArray.reduce((accumulator, currentValue) => accumulator + currentValue);

  if (totalCount === 1) {
    return '1 copo de água';
  }

  return `${totalCount} copos de água`;
}