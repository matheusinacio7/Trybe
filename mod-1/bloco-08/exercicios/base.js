function getNewEmployee(fullName) {
  const nameWithDashes = fullName.toLowerCase().split(' ').join('_');
  return {
    fullName: fullName,
    email: `${nameWithDashes}@trybe.com`,
  };
}

function generateEmployees(employFunction) {
  const employees = {
    id1: employFunction('Pedro Guerra'),
    id2: employFunction('Luiza Drumond'),
    id3: employFunction('Carla Paiva'),
  };

  return employees;
}

console.log(generateEmployees(getNewEmployee));

function lotteryDraw(bet, compareFunction) {
  const draw = Math.floor(Math.random() * 5 + 1);

  if (compareFunction(bet, draw)) {
    return 'Parabéns, você ganhou!';
  } else {
    return 'Tente novamente.';
  }
}

console.log(lotteryDraw(3, (a, b) => a === b));
