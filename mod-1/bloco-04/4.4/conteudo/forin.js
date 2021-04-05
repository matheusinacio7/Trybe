let names = {
  person1: 'João',
  person2: 'Maria',
  person3: 'Jorge' 
} 

/*  Abaixo começo a usar template literal, uma construção do JavaScript que facilita
      o uso de variáveis dentro de strings.
    Você pode ler mais sobre no link a seguir:
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
*/

for (let key in names) {
  console.log(`Olá ${names[key]}`);
}

let carro = {
  model: 'A3 Sedan',
  manufacturer: 'Audi',
  year: 2020
}

for (let key in carro) {
  console.log(`${key}: ${carro[key]}`);
}