/*
      ATENÇÃO

  Não se preocupe se você não entender os exemplos com recursividade ou os exemplos "one-liner";
  Normalmente não é uma boa prática esse tipo de código.
*/

// -------------- Função 1: substituir x -------------- //

const getTryberPhrase = (tryberName) => 'Tryber x aqui!'.replace('x', tryberName);

console.log(getTryberPhrase('Inacio'));

const skillArray = ['Sociabilidade', 'Criatividade', 'Estratégia', 'Node', 'React'];

function getTryberAndSkills(tryberName) {
  let rollingString = getTryberPhrase(tryberName);

  rollingString += ' Minhas cinco principais habilidades são:';

  const sortedSkillArray = skillArray.sort();

  for (let skill of sortedSkillArray) {
    rollingString += `\n* ${skill}`;
  }

  return rollingString;
}

console.log(getTryberAndSkills('Inacio'));
