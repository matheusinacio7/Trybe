const student1 = {
  Html: 'Muito Bom',
  Css: 'Bom',
  JavaScript: 'Ótimo',
  SoftSkills: 'Ótimo',
};

const student2 = {
  Html: 'Bom',
  Css: 'Ótimo',
  JavaScript: 'Ruim',
  SoftSkills: 'Ótimo',
  Git: 'Bom', // chave adicionada
};

function listSkills(student) {
  const skillKeys = Object.keys(student);

  for (let skillKey of skillKeys) {
    console.log(`${skillKey}, Nível: ${student[skillKey]}`);
  }
}

console.log('Estudante 1');
listSkills(student1);

console.log('-----------------');

console.log('Estudante 2');
listSkills(student2);
