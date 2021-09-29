const app = require('express')();

const PORT = 3001;

const foods = [
  { id: 1, name: 'Lasanha', price: 40.0, waitTime: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', price: 35.0, waitTime: 25 },
  { id: 3, name: 'Macarrão com molho branco', price: 35.0, waitTime: 25 },
];

const drinks = [
  { id: 1, name: 'Refrigerante Lata', price: 5.0 },
  { id: 2, name: 'Refrigerante 600ml', price: 8.0 },
  { id: 3, name: 'Suco 300ml', price: 4.0 },
  { id: 4, name: 'Suco 1l', price: 10.0 },
  { id: 5, name: 'Cerveja Lata', price: 4.5 },
  { id: 6, name: 'Água Mineral 500 ml', price: 5.0 },
];

const recipes = {
  drinks,
  foods
};

const sortByField = (fieldName, array) => (sortingFunction) => array.sort((a, b) => sortingFunction(a[fieldName], b[fieldName]));

const sortAlphabetically = (a, b) => a.localeCompare(b);

app.get('/:recipe', (req, res) => res.status(200).json(sortByField('name', recipes[req.params.recipe])(sortAlphabetically)));

app.get('/:recipe/:id', (req, res) => {
  const recipe = recipes[req.params.recipe].find(({ id }) => req.params.id == id);

  if (!recipe ) return res.status(404).json({ message: `Receita de id ${req.params.id} não encontrada.` });

  return res.status(200).json(recipe);
});

app.listen(PORT, () => {
  console.log('Servidor ativo na porta ', PORT);
});
