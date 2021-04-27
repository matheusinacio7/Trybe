function addNewProp(object, key, value) {
  object[key] = value;
  return object;
}

const tryber = {
  nome: 'Matheus',
  sobrenome: 'Inacio',
}

console.log(tryber);

addNewProp(tryber, 'idade', 25);

console.log(tryber);
