const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, (answer) => resolve(answer));
});

const wordList = fs.readFileSync('word_list.txt', 'utf8').split('\n');

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

function scramble(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i >= 0; i-- ) {
    const j = Math.floor(Math.random() * i);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

async function mainLoop() {
  const chosenWord = getRandomFromArray(wordList);
  const scrambledWord = scramble(chosenWord);

  console.log('\n\n==== Scrambled word guesser! ====\n\n');
  console.log(`Your word is:   ${scrambledWord}\n`)

  for (let chance = 3; chance > 0; chance --) {
    console.log(`You have ${chance} chance${chance > 1 ? 's' : ''} left\n`);
    const userGuess = await question('Guess:   ');
    if (userGuess === chosenWord) {
      console.log('\nCongratulations!!!\n');
      break;
    } else if (chance === 1) {
      console.log(`\nOh no... the answer was ${chosenWord}\n`);
    } else {
      console.log('\nUh oh... try again\n');
    }
  }

  const wantsToPlayAgain = await question('Wanna play again? (y/n)    ');

  if (wantsToPlayAgain.toLowerCase() === 'y') mainLoop();
}

mainLoop();
