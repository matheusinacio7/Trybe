let decodeDictionary = {
  1: 'a',
  2: 'e',
  3: 'i',
  4: 'o',
  5: 'u',
};

let encodeDictionary = {
  a: 1,
  e: 2,
  i: 3,
  o: 4,
  u: 5,
}

function encode(sentence) {
  let encodedSentence = '';

  for (let char of sentence) {
    if (encodeDictionary[char]) {
      encodedSentence += encodeDictionary[char];
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
      decodedSentence += decodeDictionary[parseInt(char, 10)];
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

function techList(list, name) {
  if (!list || !list.length) return 'Vazio!';

  return list.sort().map((tech) => ({tech, name}));
}

module.exports = {
  encode,
  decode,
  hydrate,
  techList
}