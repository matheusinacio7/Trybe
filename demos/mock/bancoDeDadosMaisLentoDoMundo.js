const users = [
  {
    id: 123,
    name: 'João Corça',
    favoriteFood: 'Churrasco',
  },
  {
    id: 321,
    name: 'Janete Corça',
    favoriteFood: 'Sushi',
  },
  {
    id: 404,
    name: 'Fausto O\'Four',
    favoriteFood: null,
  },
  {
    id: 666,
    name: 'Xuxa',
    favoriteFood: 'Algodão Doce',
  },
]

const Lenha = {
  QUANTIDADE: 10,
  QUALIDADE: 10,
}

const colocarLenha = (callback) => (...args) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const lenhaFoiSuficiente = Math.random() < (Lenha.QUALIDADE / 10);

    if (lenhaFoiSuficiente) {
      resolve(callback(...args));
    } else {
      reject('Faltou lenha');
    }
  }, (Math.random() + 1) * 20000 / Lenha.QUANTIDADE);
});

const getAll = colocarLenha(() => {
  return users;
})

const findOne = colocarLenha((filter) => {
  const user = users.find(filter);

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  return user;
});

const removeOne = colocarLenha((filter) => {
  const userIndex = users.findIndex(filter);

  if (userIndex === -1) {
    throw new Error('Usuário não encontrado.');
  }
  
  const userId = users[userIndex].id;
  users.splice(userIndex, 1);

  return `Usuário de ID ${userId} removido com sucesso.`;  
});

const insertOne = colocarLenha((user) => {
  users.push(user);
  return 'Usuário adicionado com sucesso.';
})

const updateOne = colocarLenha((filter, updates) => {
  const user = users.find(filter);

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }

  Object.entries(updates).forEach(([key, value]) => {
    user[key] = value;
  });

  return `Usuário de ID ${user.id} atualizado com sucesso.`;
})

function testesComRegEx() {
  findOne((user) => /joão/i.test(user.name))
    .then((user) => console.log(user))
  .catch((err) => console.error(err));
  
  removeOne((user) => /xuxa/i.test(user.name))
    .then((message) => {
      console.log(message);
    })
  .catch((err) => console.error(err));

  insertOne(({id: 111, name: 'Mama Mia', favoriteFood: 'Pizza'}))
    .then((message) => {
      console.log(message);
    })
  .catch((err) => console.error(err));

  updateOne((user) => /xuxa/i.test(user.name), {favoriteFood: 'Gelatina de groselha'})
    .then((message) => {
      console.log(message);
    })
  .catch((err) => console.error(err));

  getAll()
    .then((allUsers) => console.log(allUsers))
  .catch((err) => console.error(err));
}

// testesComRegEx();

module.exports = {
  getAll,
  findOne,
  insertOne,
  removeOne,
  updateOne,
}
