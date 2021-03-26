// exercicio 6

let n = 7;

let rows = Math.ceil(n / 2);

for(let i = 0; i < rows; i++) {
  let row = "";
  let firstDot = rows - i;
  let lastDot = rows + i;

  for(let j = 1; j <= n; j++) {
    if(i == rows - 1 ){
      row += "*";
    } else if(j == firstDot || j == lastDot) {
      row += "*";
    } else {
      row += " ";
    }
  }
  console.log(row);
}


// exercicio 7

let numberToCheck = 31;
let isPrime = true;

for(let d = 2; d < numberToCheck; d++) {
  if(numberToCheck % d === 0) {
    isPrime = false;
  }
}

let successString;

if(isPrime) {
  successString = " é um número primo.";
} else {
  successString = " não é um número primo.";
}

console.log(numberToCheck + successString);