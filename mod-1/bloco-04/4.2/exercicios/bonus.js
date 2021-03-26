
// // codigo mostrado

// let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

// for (let index = 1; index < numbers.length; index += 1) {
//   for (let secondIndex = 0; secondIndex < index; secondIndex += 1) {
//     if (numbers[index] < numbers[secondIndex]) {
//       let position = numbers[index];
//       numbers[index] = numbers[secondIndex];
//       numbers[secondIndex] = position;
//     }
//   }
// }

// console.log(numbers);

// exercicio 1

let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for(let maxIndex = numbers.length; maxIndex > 0; maxIndex--) {
  for(let i = 1; i < maxIndex; i++) {
    if(numbers[i] < numbers[i - 1]) {
      let swap = numbers[i];
      numbers[i] = numbers[i - 1];
      numbers[i - 1] = swap;
    }
  }
}

console.log(numbers);

// exercicio 2

numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for(let minIndex = 0; minIndex < numbers.length; minIndex++) {
  for(let i = numbers.length; i > minIndex; i--) {
    if(numbers[i] > numbers[i - 1]) {
      let swap = numbers[i];
      numbers[i] = numbers[i - 1];
      numbers[i - 1] = swap;
    }
  }
}

console.log(numbers);


// exercicio 3

numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let multipliedNumbers = [];

for(let i = 0; i < numbers.length - 1; i++) {
  multipliedNumbers.push(numbers[i] * numbers[i + 1]);
}

multipliedNumbers.push(numbers[numbers.length - 1] * 2);

console.log(multipliedNumbers);