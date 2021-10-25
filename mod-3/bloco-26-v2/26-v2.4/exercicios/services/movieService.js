const MoviesModel = require('../models/movieModel');

const getNewMovie = (movieData) => {
  const { id, title, directedBy, releaseYear } = movieData;

  return { id, title, directedBy, releaseYear };
};

const isValid = (title, directedBy, releaseYear) => {
  if (!title || typeof title !== 'string') return false;
  if (!releaseYear || typeof releaseYear !== 'number') return false;
  if (!directedBy || typeof directedBy !== 'string') return false;

  return true;
};

const getAll = async () => {
  const moviesData = await MoviesModel
  .getAll();

  return moviesData.map(getNewMovie);
};

const getById = async (id) => {
  const movie = await MoviesModel.getById(id);

  if (!movie) {
    const err = new Error('Movie not found');
    err.code = 'not_found';
    throw err;
  }

  return getNewMovie(movie);
}

const deleteById = async (id) => {
  const objMessage = await MoviesModel.deleteById(id);

  if (!objMessage) {
    const err = new Error('Movie not found');
    err.code = 'not_found';
    throw err;
  }

  return objMessage;
}

const create = async ({ title, directedBy, releaseYear }) => {
  const isMovieValid = isValid(title, directedBy, releaseYear);

  if (!isMovieValid) return false;

  const { id } = await MoviesModel
  .create({ title, directedBy, releaseYear });

  return {
    id,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
};
