const MovieService = require('../services/movieService');

const getAll = async (_req, res) => {
  const movies = await MovieService
    .getAll();

  res.status(200).json(movies);
};

const getById = async (req, res) => {
  try {
    const movie = await MovieService.getById(req.params.id);
    res.status(200).json(movie);
  } catch {
    res.status(404).json({ message: 'Movie not found' });
  }
};

const create = async (req, res) => {
  const { title, directedBy, releaseYear } = req.body;

  const movie = await MovieService
    .create({ title, directedBy, releaseYear });

  if (!movie) {
    return res.status(400)
      .json({ message: 'Dados inválidos' });
  }

  res.status(201)
    .json({ message: 'Filme criado com sucesso!' });
};

const deleteById = async (req, res) => {
  try {
    const objMessage = await MovieService.deleteById(req.params.id);
    res.status(200).json(objMessage);
  } catch (err) {
    res.status(404).json({ message: 'Movie not found' });
  }
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
};