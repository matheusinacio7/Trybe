const { test, expect } = require('@jest/globals');
const { searchEmployee } = require('./searchEmployee');

test('Função existe', () => {
  expect(typeof searchEmployee).toBe('function');
});

test('Retorna erro quando o id não é encontrado', () => {
  expect(() => searchEmployee('8491-9')).toThrowError(new Error('ID não encontrada.'));
});

describe('Retorna as informações corretas quando encontra um match.', () => {
  const employee = {
    id: '1256-4',
    firstName: 'Linda',
    lastName: 'Bezos',
    specialities: ['Hooks', 'Context API', 'Tailwind CSS'],
  };

  test('Retorna todas as informações quando os detalhes não são especificados.', () => {
    expect(searchEmployee(employee.id)).toEqual(employee);
  });

  test('Retorna apenas as informações requisitadas quando especificadas.', () => {
    expect(searchEmployee(employee.id, 'firstName')).toEqual({firstName: employee.firstName});
    expect(searchEmployee(employee.id, 'lastName', 'specialities')).toEqual({
      lastName: employee.lastName,
      specialities: employee.specialities,
    });
  });

  
});
