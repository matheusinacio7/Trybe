function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulus(a, b) {
  return a % b;
}

function getGreaterOfTwo(a, b) {
  if (a > b) {
    return a;
  } else if (b > a) {
    return b;
  } else {
    return null;
  }
}

function getGreaterOfThree(a, b, c) {
  if(a > b && a > c) {
    return a;
  } else if (b > a && b > c) {
    return b;
  } else if (c > a && c > b) {
    return c;
  } else {
    return null;
  }
}

function isPositiveOrNegative(input) {
  if (input > 0) {
    return "positive";
  } else if (input < 0) {
    return "negative";
  } else {
    return "zero";
  }
}

function getTriangleString(angle1, angle2, angle3) {
  let soma = angle1 + angle2 + angle3;

  if(angle1 < 0 || angle1 > 180 ||
    angle2 < 0 || angle2 > 180 ||
    angle3 < 0 || angle3 > 180) {
    return "Todos os ângulos de um triângulo devem ser maiores que 0 e menores que 180.";
  } else if(soma == 180) {
    return "Os ângulos formam um triângulo!";
  } else {
    return "Os ângulos não formam um triângulo.";
  }
}

function getChessPieceMoveString(piece) {
  piece = piece.toLowerCase();

  switch(piece) {
    case 'king':
      return 'Any direction, one square.';
      break;
    case 'queen':
      return 'Any straight line, any number of vacant squares.';
      break;
    case 'rook':
      return 'Horizontal or vertical straight line, any number of vacant squares.';
      break;
    case 'bishop':
      return 'Diagonals, any number of vacant squares.';
      break;
    case 'knight':
      return 'Any 2->3 or 3->2 square, not necessarily vacant.';
      break;
    case 'pawn':
      return 'Forward one square. Captures diagonally one square.';
      break;
    default:
      return 'Not a chess piece.';
      break;
  }
}

function getLetterGradingFromPercent(percentGrade) {
  if (percentGrade > 100 || percentGrade < 0) {
    console.error('Percentage of grade must be equal or greater than 0 and lower than 100');
    return null;
  } else if (percentGrade >= 90) {
    return 'A';
  } else if (percentGrade >= 80) {
    return 'B';
  } else if (percentGrade >= 70) {
    return 'C';
  } else if (percentGrade >= 60) {
    return 'D';
  } else if (percentGrade >= 50) {
    return 'E';
  } else {
    return 'F';
  }
}

function isAnyOdd(a, b, c) {
  if(a % 2 !== 0 || b % 2 !== 0 || c % 2 !== 0) {
    return true;
  } else {
    return false;
  }
}

function isAnyEven(a, b, c) {
  if(a % 2 === 0 || b % 2 === 0 || c % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

function getProfit (valorCusto, valorVenda, unidades) {
  let impostoSobreOCusto = valorCusto * 0.2;
  let valorCustoTotal = (valorCusto + impostoSobreOCusto) * unidades;
  let lucro = (valorVenda - valorCustoTotal) * unidades;

  return lucro;
}

function getNetSalary(grossSalary) {
  let INSS;
  let IR;

  if(grossSalary <= 1556.94) {
    INSS = grossSalary * 0.08;
  } else if(grossSalary <= 2594.92) {
    INSS = grossSalary * 0.09;
  } else if(grossSalary <= 5189.82) {
    INSS = grossSalary * 0.11;
  } else {
    INSS = 570.88;
  }

  let baseSalary = grossSalary - INSS;

  if(baseSalary <= 1903.98) {
    IR = 0;
  } else if(baseSalary <= 2826.65) {
    IR = baseSalary * 0.075 - 142.80;
  } else if(baseSalary <= 3751.05) {
    IR = baseSalary * 0.15 - 354.80;
  } else if(baseSalary <= 4664.68) {
    IR = baseSalary * 0.225 - 636.13;
  } else {
    IR = baseSalary * 0.275 - 869.36;
  }

  let netSalary = baseSalary - IR;

  return netSalary;
}