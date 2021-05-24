// Dados
const professionalBoard = [
  {
    id: '8579-6',
    firstName: 'Ana',
    lastName: 'Gates',
    specialities: ['UX', 'Design'],
  },
  {
    id: '5569-4',
    firstName: 'George',
    lastName: 'Jobs',
    specialities: ['Frontend', 'Redux', 'React', 'CSS'],
  },
  {
    id: '4456-4',
    firstName: 'Leila',
    lastName: 'Zuckerberg',
    specialities: ['Context API', 'RTL', 'Bootstrap'],
  },
  {
    id: '1256-4',
    firstName: 'Linda',
    lastName: 'Bezos',
    specialities: ['Hooks', 'Context API', 'Tailwind CSS'],
  },
  {
    id: '9852-2-2',
    firstName: 'Jeff',
    lastName: 'Cook',
    specialities: ['Ruby', 'SQL'],
  },
  {
    id: '4678-2',
    firstName: 'Paul',
    lastName: 'Dodds',
    specialities: ['Backend'],
  },
];

const searchEmployee = (id, ...details) => {
  const foundEmployee = professionalBoard.find((employee) => employee.id === id);

  if(!foundEmployee) {
    throw new Error('ID não encontrada.');
  };

  if(!details.length) {
    return foundEmployee;
  }

  const info = {};

  details.forEach((detail) => {
    if (foundEmployee[detail]) {
      info[detail] = foundEmployee[detail];
    }
  });

  if (!Object.keys(info).length) {
    throw new Error('Informação não disponível.');
  }

  return info;
};

module.exports = {
  searchEmployee,
  professionalBoard,
}