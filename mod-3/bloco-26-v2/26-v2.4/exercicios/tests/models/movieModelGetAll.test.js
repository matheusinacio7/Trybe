const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/movieModel');

describe('Busca todos os filmes', () => {
  let connectionMock; 
  
  before(async () => {
    const DBServer = await MongoMemoryServer.create();
    const URLMock = DBServer.getUri();  
    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('model_example'));
    
    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });
  
  after(() => {
    mongoConnection.getConnection.restore();
  })
  
  
  describe('Quando não existe nenhum filme criado', () => {
    it('retorna uma array', async () => {
      const movies = await MoviesModel.getAll();
      
      expect(movies).to.be.an('array');
    });
    
    it('a array está vazia', async () => {
      const movies = await MoviesModel.getAll();
      
      expect(movies).to.be.empty;
    });
  });
  
  describe('Quando existem filmes cadastrados', () => {
    const expectedMovie = {
      id: '604cb554311d68f491ba5781',
      title: 'Example Movie',
      directedBy: 'Jane Dow',
      releaseYear: 1999,
    };  
    
    before(async () => {
      await connectionMock.collection('movies').insertOne({ ...expectedMovie });
    }); 
    
    after(async () => {
      await connectionMock.collection('movies').drop();
    });
    
    it('retorna uma array', async () => {
      const movies = await MoviesModel.getAll();
      
      expect(movies).to.be.an('array');
    });
    
    it('a array não está vazia!', async () => {
      const movies = await MoviesModel.getAll();
      
      expect(movies).to.be.not.empty;
    });
    
    it('a array possui dados do tipo objeto', async () => {
      const [ item ] = await MoviesModel.getAll();
      
      expect(item).to.be.an('object');
    });
    
    it('tais itens possuem os atributos "id", "title", "directedBy", "releaseYear"', async () => {
      const [ item ] = await MoviesModel.getAll();
      
      expect(item).to.include.all.keys(['id', 'title', 'directedBy', 'releaseYear']);
    }); 
    
    it('o filme cadastrado está na lista', async () => {
      const [ { id, title, directedBy, releaseYear } ] = await MoviesModel.getAll();
      
      expect({ id, title, directedBy, releaseYear }).to.deep.equal(expectedMovie);
    });
  });
});