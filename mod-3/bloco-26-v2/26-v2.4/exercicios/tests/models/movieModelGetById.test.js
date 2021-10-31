const { stub } = require('sinon');
const { describe, it } = require('mocha');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const MovieModel = require('../../models/movieModel');

describe('O modelo Movie, no comando getById', () => {
  const movieId = '604cb554311d68f491ba5781';

  const existingMovie = {
    title: 'Kung Fury',
    directedBy: 'David Sandberg',
    releaseYear: 2015,
  };

  beforeEach(async () => {
    const dbServer = await MongoMemoryServer.create();
    const mockUrl = dbServer.getUri();

    const db = await MongoClient.connect(mockUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((connection) => connection.db('model_test'));

    await db.collection('movies').insertOne({ ...existingMovie, _id: new ObjectId(movieId) });

    stub(mongoConnection, 'getConnection').resolves(db);
  });

  afterEach(() => {
    mongoConnection.getConnection.restore();
  });

  it('com um id existente, retorna o filme correto', async () => {
    const foundMovie = await MovieModel.getById(movieId);

    expect(foundMovie).to.deep.equal({ id: new ObjectId(movieId), ...existingMovie });
  });

  it('com um id inexistente, retorna nulo', async () => {
    const foundMovie = await MovieModel.getById('ugabuga');

    expect(foundMovie).to.be.null;
  });
});
