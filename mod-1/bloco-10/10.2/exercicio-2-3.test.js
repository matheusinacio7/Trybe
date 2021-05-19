const { findUserById, getUserName, users } = require('./exercicio-2-3');

describe('findUserById', () => {
  test('Encontra o usuário corretamente', () => {
    return expect(findUserById(4)).resolves.toEqual({name: 'Mark'});
  });
  test('Retorna erro se o usuário não existe', () => {
    return expect(findUserById(3)).rejects.toEqual({error: 'User with ID 3 not found.'});
  });
});

// Resolvi fazer de um jeito para findUserById e de outro para getUserName

// describe('getUserName', () => {
//   test()
// })
