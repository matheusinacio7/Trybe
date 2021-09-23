const { questionInt } = require('readline-sync');

function getSpeed(distance, time) {
  return distance / time;
}

function prompt() {
  const distance = questionInt('Qual a distância, em metros? (inteiro) ');
  const time = questionInt('Qual o tempo, em segundos? (inteiro) ');
  
  const speed = getSpeed(distance, time);
  
  console.log('');
  console.log(`A velocidade é ${speed} m/s`);
}
