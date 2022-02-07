const { findOne, getAll, insertOne, removeOne, updateOne } = require('./bancoDeDadosMaisLentoDoMundo');

async function getGreetingString(userId, greeting) {
  try {
    const { name, favoriteFood } = await findOne((user) => user.id === userId);
    return `${greeting}! Meu nome é ${name} e minha comida favorita é ${favoriteFood}!\nQual a sua??`;
  } catch (err) {
    return `Eita.. tivemos o seguinte erro: ${err}`;
  }
}

module.exports = {
  getGreetingString,
}