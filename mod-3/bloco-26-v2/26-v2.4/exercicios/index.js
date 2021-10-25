const express = require('express');

const MovieController = require('./controllers/movieController');

const app = express();

app.use(express.json());

app.get('/movies', MovieController.getAll);

app.get('/movies/:id', MovieController.getById);

app.post('/movies', MovieController.create);

app.delete('/movies/:id', MovieController.deleteById);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});