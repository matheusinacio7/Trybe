const { stub } = require('sinon');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const MovieModel = require('../../models/movieModel');
const movieService = require('../../services/movieService');

describe('movieService no deleteById', () => {
  const movieId = '604cb554311d68f491ba5781';

  const existingMovie = {
    title: 'Kung Fury',
    directedBy: 'David Sandberg',
    releaseYear: 2015,
  };

  beforeEach(() => {
    const ModelStub = stub(MovieModel, 'deleteById');
    ModelStub.withArgs(movieId).resolves({ message: 'Movie deleted sucessfully' });
    ModelStub.withArgs('ugabuga').resolves(null);
  });

  afterEach(() => {
    MovieModel.getById.restore();
  });

  it('Com um id correto, retorna uma mensagem de sucesso', async () => {
    const deletedMessage = await movieService.deleteById(movieId);
    expect(deletedMessage).to.deep.equal({ message: 'Movie deleted sucessfully' });
  });

  it('Com um id errado, rejeita com um erro', async () => {
    try {
      movieService.deleteById('ugabuga');
    } catch(err) {
      expect(err.code).to.equal('not_found');
    }
  });
});
