const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors(),
  express.json(),
);

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

const combineFilters = ([head, ...tail]) => (data) => (head ? (head(data) && combineFilters(tail)(data)) : true);

const filterCombined = (array, filterFuncs) => array.filter((el) => combineFilters(filterFuncs)(el));

app.get('/:recipe/search', (req, res) => {
  const queryParams = req.query;

  const filterFuncs = {
    name: (recipe) => new RegExp(req.query.name, 'i').test(recipe.name),
    maxPrice: (recipe) => recipe.price <= parseFloat(queryParams.maxPrice, 10),
    minPrice: (recipe) => recipe.price >= parseFloat(queryParams.minPrice, 10),
  };

  const filters = Object.keys(queryParams).map((query) => filterFuncs[query]);

  const filteredRecipes = filterCombined(recipes[req.params.recipe], filters);

  if (filteredRecipes.length === 0) return res.status(204).json({ message: 'Nenhuma receita encontrada com esses parâmetros de busca.' });

  return res.status(200).json(filteredRecipes);
});

app.get('/:recipe/:id', (req, res) => {
  const recipe = recipes[req.params.recipe].find(({ id }) => req.params.id == id);

  if (!recipe ) return res.status(404).json({ message: `Receita de id ${req.params.id} não encontrada.` });

  return res.status(200).json(recipe);
});

app.post('/:recipe', (req, res) => {
  const { id, name, price } = req.body;

  if (!id || !name || !price) return res.status(400).json({ message: 'Os atributos necessários não foram informados.' });

  recipes[req.params.recipe].push({ id, name, price });

  return res.status(201).json({ message: `Receita de id ${id} adicionada com sucesso.` });
});

const getObjectWithoutUndefinedProps = (originalObject) => Object.fromEntries(
  Object.entries(originalObject).filter(([key, value]) =>  value !== undefined)
);

app.put('/:recipe/:id', (req, res) => {
  const id = req.params.id;
  const { id: newId, name, price } = req.body;

  const recipeIndex = recipes[req.params.recipe].findIndex((recipe) => recipe.id == id);

  if (recipeIndex === -1 ) return res.status(404).json({ message: `Receita de id ${req.params.id} não encontrada.` });

  if (!newId && !name && !price) return res.status(400).json({ message: 'É preciso alterar ao menos um atributo da receita.' });

  recipes[req.params.recipe][recipeIndex] = {
    ...recipes[req.params.recipe][recipeIndex],
    ...getObjectWithoutUndefinedProps({ id: newId, name, price }),
  };

  return res.status(204).end();
});

app.delete('/:recipe/:id', (req, res) => {
  const id = req.params.id;

  const recipeIndex = recipes[req.params.recipe].findIndex((recipe) => recipe.id == id);

  if (recipeIndex === -1 ) return res.status(404).json({ message: `Receita de id ${req.params.id} não encontrada.` });

  recipes[req.params.recipe].splice(recipeIndex, 1);

  return res.status(204).end();
});

app.all('*', (_, res) => {
  return res.status(404).json({ message: 'Endpoint desconhecido.' });
});

app.listen(PORT, () => {
  console.log('Servidor ativo na porta ', PORT);
});
