const { describe, it } = require('mocha');
const { expect } = require('chai');
const { stub, match } = require('sinon');

const movieService = require('../../services/movieService');
const movieController = require('../../controllers/movieController');

describe('movieController, no comando getById', () => {
  const request = {};
  const response = {};

  response.status = stub().returns(response);
  response.json = stub().returns(undefined);
  response.end = stub().returns(undefined);
  response.send = stub().returns(response);

  const movieId = '604cb554311d68f491ba5781';

  const existingMovie = {
    title: 'Kung Fury',
    directedBy: 'David Sandberg',
    releaseYear: 2015,
  };

  beforeEach(() => {
    const serviceStub = stub(movieService, 'getById');

    serviceStub.withArgs(movieId).resolves({ id: movieId, ...existingMovie });

    const err = new Error('Not found');
    err.code = 'not_found';
    serviceStub.withArgs('ugabuga').rejects(err);
  });

  afterEach(() => {
    movieService.getById.restore();
  });

  it('com um id correto, traz a resposta com o filme', () => {
    request.params = { id: movieId };

    movieController.getById(request, response);

    expect(response.status.calledWith(200)).to.be.true;
    expect(response.json.calledWith(match({ id: existingId, ...existingMovie }))).to.be.true;
  });

  it('com um id inexistente, traz uma resposta de 404', () => {
    request.params = { id: 'ugabuga' };

    movieController.getById(request, response);

    expect(response.status.calledWith(404)).to.be.true;
    expect(response.json.calledWith(match({ message: 'Movie not found' }))).to.be.true;
  })
});
