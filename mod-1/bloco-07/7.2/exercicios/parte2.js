const lesson1 = {
  materia: 'Matemática',
  numeroEstudantes: 20,
  professor: 'Maria Clara',
  turno: 'manhã',
};

const lesson2 = {
  materia: 'História',
  numeroEstudantes: 20,
  professor: 'Carlos',
};

const lesson3 = {
  materia: 'Matemática',
  numeroEstudantes: 10,
  professor: 'Maria Clara',
  turno: 'noite',
};


// exercicio 1

function addProperty(object, key, value) {
  object[key] = value;
  return object;
}

console.log(addProperty(lesson2, 'turno', 'tarde'));


// exercicio 2
function listKeys(object) {
  for(let key in object) {
    console.log(key);
  }
}

listKeys(lesson1);


// exercicio 3

function getNumberOfEnumerables(object) {
  return Object.keys(object).length;
}

console.log(getNumberOfEnumerables(lesson3));


// exercicio 4

function listValues(object) {
  for (let value of Object.values(object)) {
    console.log(value);
  }
}

listValues(lesson2);


// exercicio 5

const allLessons = Object.assign({}, { lesson1, lesson2, lesson3 } );

console.log(allLessons);

function countStudents(allLessonsObject) {
  let rollingTotal = 0;

  for (let lesson of Object.values(allLessonsObject)) {
    rollingTotal += lesson.numeroEstudantes;
  }

  return rollingTotal;
}

console.log(countStudents(allLessons));

function getValueByIndex(object, index) {
  return Object.values(object)[index];
}

console.log(getValueByIndex(lesson1, 0));

function verifyPair(object, key, value) {
  return object[key] === value;
}

console.log(verifyPair(lesson3, 'turno', 'noite'));

console.log(verifyPair(lesson3, 'materia', 'Maria Clara'));
