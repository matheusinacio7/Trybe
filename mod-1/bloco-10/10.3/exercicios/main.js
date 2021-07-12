function getRandomIntUpTo100() {
  return Math.floor(Math.random() * 101);
}

function uppercaseString(str) {
  return str.toUpperCase();
}

function getFirstChar(str) {
  return str[0];
}

function concatTwoStrings(str1, str2) {
  return str1 + str2;
}

module.exports = {
  getRandomIntUpTo100,
  uppercaseString,
  getFirstChar,
  concatTwoStrings,
}
