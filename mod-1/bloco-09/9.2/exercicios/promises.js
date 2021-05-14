function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPowerLevel() {
  return new Promise((resolve, reject) => {
    const powerIndexes = [];

    for (let i = 0; i < 10; i += 1) {
      powerIndexes.push(getRandomInt(1, 50));
    }
  });
}

getPowerLevel()
.then(() => console.log('Promise resolvida.'))
.catch(() => console.log('Promise rejeitada.'));
