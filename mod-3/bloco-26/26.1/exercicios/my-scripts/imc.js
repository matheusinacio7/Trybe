const { questionInt, questionFloat } = require('readline-sync');

function getIMC(weightInKg, heightInCm) {
  return weightInKg / ((heightInCm / 100) ** 2);
}

function getClassification(imc) {
  if (imc < 18.5) {
    return 'Abaixo do peso (magreza)';
  }

  if (imc < 25) {
    return 'Peso normal';
  }

  if (imc < 30) {
    return 'Acima do peso (sobrepeso)';
  }

  if (imc < 35) {
    return 'Obesidade grau I';
  }

  if (imc < 40) {
    return 'Obesidade grau II';
  }

  return 'Obesidade graus III e IV';
}

function runQuestions() {
  const weight = questionFloat('Qual seu peso, em kg? ');
  const height = questionInt('Qual sua altura em cm? Digite apenas o numero inteiro ');
  console.log('');
  
  const imc = getIMC(weight, height);
  const classification = getClassification(imc);
  console.log(`O seu IMC é ${imc.toFixed(2)}`);
  console.log(`Sua classificação de peso é: ${classification}`);
}

runQuestions();
