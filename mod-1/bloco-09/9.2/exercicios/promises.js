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
    const humanLevels = [sum / 2, sum / 3, sum / 5, sum / 10].map((level) => Math.round(level));

    if (sum > 8000) {
      reject('É mais de oito mil!');
    } else {
      resolve(humanLevels);
    }
  });
}

function sumPowerLevels(powerLevels) {
  return new Promise((resolve, reject) => {
    resolve(powerLevels.reduce((acc, curr) => acc + curr, 0));
  })
}

getPowerLevel()
.then((powerLevels) => sumPowerLevels(powerLevels))
.then((powerTotal) => console.log(`O poder é menos de ${powerTotal}`))
.catch((reason) => console.log(`${reason} Essa promise deve estar quebrada!`));
