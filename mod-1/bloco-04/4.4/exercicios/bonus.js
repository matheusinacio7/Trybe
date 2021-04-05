let dictionary = {
  'I': 1,
  'V': 5,
  'X': 10,
  'L': 50,
  'C': 100,
  'D': 500,
  'M': 1000,
}

function getDecimalFromRoman(romanString) {
  let decimal = dictionary[romanString[0]];

  if(romanString.length === 1) {
    return decimal;
  }

  for(let i = 1; i < romanString.length; i++) {
    let currentLetter = romanString[i];
    let previousLetter = romanString[i - 1];

    if(dictionary[currentLetter] > dictionary[previousLetter]) {
      decimal -= dictionary[previousLetter] * 2;
    } 

    decimal += dictionary[currentLetter];
  }

  return decimal;
}


console.log(getDecimalFromRoman('MDCCLI'));