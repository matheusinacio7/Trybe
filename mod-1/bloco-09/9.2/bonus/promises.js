function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getPowerLevel() {
  const powerIndexes = [];

  for (let i = 0; i < 10; i += 1) {
    powerIndexes.push(getRandomInt(1, 50) ** 2);
  }

  const sum = powerIndexes.reduce((acc, curr) => acc + curr, 0);
  const humanLevels = [sum / 2, sum / 3, sum / 5, sum / 10].map((level) => Math.round(level));

  if (sum > 8000) {
    throw new Error('É mais de oito mil!');
  } else {
    return(humanLevels);
  }
}

async function sumPowerLevels(powerLevels) {
  return powerLevels.reduce((acc, curr) => acc + curr, 0);
}

async function whatsHisPowerLevelVegeta() {
  try {
    const powerLevels = await getPowerLevel();
    const powerTotal = await sumPowerLevels(powerLevels);
    console.log(`O poder é menos de ${powerTotal}`);
  } catch (reason) {
    console.log(`${reason} Essa promise deve estar quebrada!`);
  } 
}

whatsHisPowerLevelVegeta();
