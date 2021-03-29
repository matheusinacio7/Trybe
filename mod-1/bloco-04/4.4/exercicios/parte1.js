/*  Abaixo começo a usar template literal, uma construção do JavaScript que facilita
      o uso de variáveis dentro de strings.
    Você pode ler mais sobre no link a seguir:
      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
*/

let info = {
  personagem: 'Margarida',
  origem: 'Pato Donald',
  nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
  recorrente: 'Sim',
};

console.log(`Bem-vinda, ${info.personagem}`);

console.log('====================');

console.log(info);

console.log('====================');

for (let characteristic in info) {
  console.log(characteristic);
}

console.log('====================');

for (let characteristic in info) {
  console.log(info[characteristic]);
}

let info2 = {
  personagem: 'Tio Patinhas',
  origem: 'Christmas on Bear Mountain, Dell\'s Four Color Comics #178',
  nota: 'O último MacPatinhas',
  recorrente: 'Sim',
}

console.log('====================');

for (let char in info) {
  if(char === 'recorrente') {
    if(info[char] === 'Sim' && info2[char] === 'Sim') {
      console.log('Ambos recorrentes');
    } else {
      console.log(`Recorrente: ${info[char]} e ${info2[char]}.`);
    }
  } else {
    console.log(info[char] + ' e ' + info2[char]);
  }
}