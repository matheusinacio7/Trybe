const { findUserById, getUserName, users } = require('./exercicio-2-3');

describe('findUserById', () => {
  it('Encontra o usuário corretamente', () => {
    return expect(findUserById(4)).resolves.toEqual({name: 'Mark'});
  });
  it('Retorna erro se o usuário não existe', () => {
    return expect(findUserById(3)).rejects.toEqual({error: 'User with ID 3 not found.'});
  });
});

// Resolvi fazer de um jeito para findUserById e de outro para getUserName

describe('getUserName', () => {
  it('Encontra o usuário corretamente', async () => {
    const userName = await getUserName(5);
    expect(userName).toBe('Paul');
  });

  it('Retorna erro se o usuário não existe', async () => {
    try {
      await getUserName(3);
      fail();
    } catch (err) {
      expect(err).toEqual({error: 'User with ID 3 not found.'});
    }
  });
});


