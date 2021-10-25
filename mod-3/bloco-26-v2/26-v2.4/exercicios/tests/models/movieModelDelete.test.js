const { stub } = require('sinon');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const MovieModel = require('../../models/movieModel');

describe('O modelo Movie, no comando deleteById', () => {
  const movieId = '604cb554311d68f491ba5781';

  const existingMovie = {
    title: 'Kung Fury',
    directedBy: 'David Sandberg',
    releaseYear: 2015,
  };

  let db;

  beforeEach(async () => {
    const dbServer = await MongoMemoryServer.create();
    const mockUrl = dbServer.getUri();

    db = await MongoClient.connect(mockUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((connection) => connection.db('model_test'));

    await db.collection('movies').insertOne({ ...existingMovie, _id: new ObjectId(movieId) });

    stub(mongoConnection, 'getConnection').resolves(db);
  });

  afterEach(() => {
    mongoConnection.getConnection.restore();
  });

  it('com um id existente, deleta o filme, retornando uma mensagem de sucesso', async () => {
    const deletedMessage = await MovieModel.deleteById(movieId);

    expect(deletedMessage).to.deep.equal({ message: 'Movie deleted sucessfully' });

    const allMovies = await db.collection('movies').find().toArray();

    expect(allMovies).to.deep.equal([]);
  });

  it('com um id inexistente, retorna nulo, mantendo o db intacto', async () => {
    const deletedMovie = await MovieModel.getById('ugabuga');

    expect(deletedMovie).to.be.null;
    const allMovies = await db.collection('movies').find().toArray();

    expect(allMovies).to.deep.equal([{ _id: new ObjectId(movieId), ...existingMovie }]);
  });
});
