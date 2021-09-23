const { questionInt, question } = require('readline-sync');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function prompt() {
  const result = getRandomInt(0, 10);

  console.log('\nJogo de advinhação!');
  const guess = questionInt('\nChute um número de 0 a 10:\n');
  if (guess === result) {
    console.log('\nParabéns! Número correto!');
  } else {
    console.log(`\nOpa, não foi dessa vez. O número era ${result}.`);
  }
}

function askWantsToPlayAgain() {
  const playAgain = question('\nDeseja jogar novamente? (S/N)  ');
  console.log(playAgain);
  
  if (playAgain.toLowerCase() === 's') {
    return true;
  } else if (playAgain.toLowerCase() === 'n') {
    return false;
  } else {
    console.log('\nDesculpe, não entendi o que você quis dizer... Use a letra S ou N apenas.');
    askWantsToPlayAgain();
  }
}

function playLoop() {
  prompt();
  if (askWantsToPlayAgain()) {
    playLoop();
  }
}

playLoop();

module.exports = {
  getRandomInt
};
