const Animals = [
  { name: 'Dorminhoco', age: 1, type: 'Dog' },
  { name: 'Amimir', age: 1, type: 'Cat '},
  { name: 'Soneca', age: 2, type: 'Dog' },
  { name: 'Preguiça', age: 5, type: 'Cat' },
];

const findAnimalByName = (name) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundAnimal = Animals.find((animal) => animal.name === name);

      if (!foundAnimal) {
        return reject('Nenhum animal com esse nome!');
      }

      return resolve(foundAnimal);
    }, 100);
  })
);

const getAnimal = (name) => (
  findAnimalByName(name).then(animal => animal)
);

const findAnimalsByType = (type) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const arrayAnimals = Animals.filter((animal) => animal.type === type);
      if (arrayAnimals.length !== 0) {
        return resolve(arrayAnimals);
      };

      return reject({ error: 'Não possui esse tipo de animal.' });
    }, 100);
  })
);

const getListAnimals = (type) => (
  findAnimalsByType(type).then(list => list)
);

const getAnimalsByAge = (age) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundAnimals = Animals.filter((animal) => animal.age === age);

      if(!foundAnimals.length) {
        return reject({ error: 'Nenhum animla tem essa idade.' });
      }
      return resolve(foundAnimals);
    }, 100);
  })
}

module.exports = {
  getAnimal,
  getAnimalsByAge,
}