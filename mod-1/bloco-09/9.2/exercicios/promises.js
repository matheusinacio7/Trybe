function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPowerLevel() {
  return new Promise((resolve, reject) => {
    const powerIndexes = [];

    for (let i = 0; i < 10; i += 1) {
      powerIndexes.push(getRandomInt(1, 50) ** 2);
    }

    const sum = powerIndexes.reduce((acc, curr) => acc + curr, 0);

    if (sum > 8000) {
      reject();
    } else {
      resolve();
    }
  });
}

getPowerLevel()
.then(() => console.log('Promise resolvida.'))
.catch(() => console.log('Promise rejeitada.'));
