function getGreetingString(greeting, {name, favoriteFood}) {
  return (`${greeting}! Meu nome é ${name} e minha comida favorita é ${favoriteFood}!
Qual a sua??`);
}

module.exports = {
  getGreetingString,
}