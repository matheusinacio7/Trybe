// array para exercicios de 1 a 7
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

// exercicio 1
for (let number of numbers) {
  console.log(number);
}

// exercicio 2
let sum = 0;
for (let number of numbers) {
  sum += number;
}
console.log(sum);

// exercicio 3
let average = sum / numbers.length;
console.log(average);

// exercicio 4
if(average > 20) {
  console.log("valor maior que 20");
} else {
  console.log("valor menor ou igual a 20");
}

// exercicio 5
let highest = Number.MAX_SAFE_INTEGER * -1;
for (let number of numbers) {
  if (number > highest) {
    highest = number;
  }
}
console.log(highest);

// exercicio 6
let odds = [];
for (let number of numbers) {
  if (number % 2 === 1) {
    odds.push(number);
  }
}

if(odds.length) {
  console.log("Há " + odds.length + " números ímpares no array.");
} else {
  console.log("Nenhum valor ímpar encontrado. ");
}

// exercicio 7
let lowest = Number.MAX_SAFE_INTEGER;
for (let number of numbers) {
  if(number < lowest) {
    lowest = number;
  }
}

console.log(lowest);

// exercicio 8
let upTo25 = [];
for (let i = 1; i <= 25; i++) {
  upTo25.push(i);
}
console.log(upTo25);

// exercicio 9
for(let number of upTo25) {
  console.log(number / 2);
}