const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getMoviesCollection = async () => await mongoConnection.getConnection()
  .then((db) => db.collection('movies'));

const getAll = async () => {
  const moviesCollection = await getMoviesCollection();

  const movies = await moviesCollection
    .find()
    .toArray();

  return movies.map(({ _id, ...movieData }) => ({
    id: _id,
    ...movieData,
  }));
};

const getById = async (id) => {
  const moviesCollection = await getMoviesCollection();

  if (!ObjectId.isValid(id)) return null;

  const { _id, ...rest} = await moviesCollection.findOne(new ObjectId(id));
  
  return { id: _id, ...rest };
};

const create = async ({ title, directedBy, releaseYear }) => {
  const moviesCollection = await getMoviesCollection();

  const { insertedId: id } = await moviesCollection
    .insertOne({ title, directedBy, releaseYear });

  return {
    id,
    title, 
    directedBy, 
    releaseYear
  };
};

module.exports = {
  create,
  getAll,
  getById,
};
