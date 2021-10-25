const { stub } = require('sinon');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const MovieModel = require('../../models/movieModel');
const movieService = require('../../services/movieService');

describe('movieService no getById', () => {
  const movieId = '604cb554311d68f491ba5781';

  const existingMovie = {
    title: 'Kung Fury',
    directedBy: 'David Sandberg',
    releaseYear: 2015,
  };

  beforeEach(() => {
    const ModelStub = stub(MovieModel, 'getById');
    ModelStub.withArgs(movieId).resolves({ id: movieId, ...existingMovie });
    ModelStub.withArgs('ugabuga').resolves(null);
  });

  afterEach(() => {
    MovieModel.getById.restore();
  });

  it('Com um id correto, retorna o movie', async () => {
    const foundMovie = movieService.getById(movieId);
    expect(foundMovie).to.deep.equal({ id: movieId, ...existingMovie });
  });

  it('Com um id errado, rejeita com um erro', async () => {
    try {
      movieService.getById('ugabuga');
    } catch(err) {
      expect(err.code).to.equal('not_found');
    }
  });
});
