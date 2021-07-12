const allLessons = {
  lesson1: {
    materia: 'Matemática',
    numeroEstudantes: 20,
    professor: 'Maria Clara',
    turno: 'manhã',
  },
  lesson2: {
    materia: 'História',
    numeroEstudantes: 20,
    professor: 'Carlos',
  },  
  lesson3: {
    materia: 'Matemática',
    numeroEstudantes: 10,
    professor: 'Maria Clara',
    turno: 'noite',
  },
};

console.log(allLessons);

function countStudentsByDiscipline(allLessonsObject, discipline) {
  let totalStudents = 0;

  for (let lesson of Object.values(allLessonsObject)) {
    if (lesson.materia === discipline) {
      totalStudents += lesson.numeroEstudantes;
    }
  }

  return totalStudents;
}

console.log(countStudentsByDiscipline(allLessons, 'Matemática'));

function getTeacherReport(allLessonsObject, teacher) {
  const report = {
    professor: teacher,
    aulas: [],
    estudantes: 0,
  };

  for (let lesson of Object.values(allLessonsObject)) {
    if (lesson.professor === teacher) {
      report.aulas.push(lesson.materia);
      report.estudantes += lesson.numeroEstudantes;
    }
  }

  return report;
}

console.log(getTeacherReport(allLessons, 'Maria Clara'));
