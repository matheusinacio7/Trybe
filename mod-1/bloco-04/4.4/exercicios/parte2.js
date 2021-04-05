/*  Abaixo começo a usar template literal, uma construção do JavaScript que facilita
      o uso de variáveis dentro de strings.
    Você pode ler mais sobre no link a seguir:
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
*/

function isParindrome(word) {
  let isParindrome = true;
  for(let i = 0; i < Math.ceil(word.length / 2); i++) {
    if(word[i] !== word[word.length - 1 - i]) {
      isParindrome = false;
      break;
    }
  }

  return isParindrome;
}

console.log(isParindrome('arara'));
console.log(isParindrome('desenvolvimento'));


function getIndexOfHighest(integerArray) {
  let indexOfHighest = 0;

  for(let index in integerArray) {
    if(integerArray[index] > integerArray[indexOfHighest]) {
      indexOfHighest = index;
    }
  }

  return indexOfHighest;
}

console.log(getIndexOfHighest([2, 3, 6, 7, 10, 1]));


function getIndexOfLowest(integerArray) {
  let indexOfLowest = 0;

  for(let index in integerArray) {
    if(integerArray[index] < integerArray[indexOfLowest]) {
      indexOfLowest = index;
    }
  }

  return indexOfLowest;
}

console.log(getIndexOfLowest([2, 4, 6, 7, 10, 0, -3]));


function getMode(integerArray) {
  let sortedArray = integerArray.sort();

  let mode = 0;
  let modeCount = 0;

  let current = sortedArray[0];
  let currentCount = 0;

  for(let num of integerArray) {
    if (num === current) {
      currentCount++;
    } else {
      if (currentCount > modeCount) {
        modeCount = currentCount;
        mode = current;
      }

      current = num;
      currentCount = 1;
    }
  }

  if (currentCount > modeCount) {
    modeCount = currentCount;
    mode = current;
  }

  return mode;
}

console.log(getMode([2, 3, 2, 5, 8, 2, 3, 8]));


function getSumUpToInteger(integer) {
  let sum = 0;

  for(let i = 1; i <= integer; i++) {
    sum += i;
  }

  return sum;
}

console.log(getSumUpToInteger(5));


function endsWithSubstring(string, substring) {
  let endsWithSubstring = true;

  let stringLastIndex = string.length - 1;
  let substringLastIndex = substring.length - 1;

  for(let i = 0; i <= substringLastIndex; i++) {
    if(substring[substringLastIndex - i] !== string[stringLastIndex - i]) {
      endsWithSubstring = false;
    }
  }

  return endsWithSubstring;
}

console.log(endsWithSubstring('trybe', 'be'));

console.log(endsWithSubstring('joaoFernando', 'fernan'));