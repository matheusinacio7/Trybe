import fetch from 'node-fetch';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import startServer from '../helpers/startServer.js';

describe('GET /ping', () => {
  let server = null;
  const baseUrl = `http://localhost:${process.env.PORT}`;

  before(async () => {
    server = await startServer();
  });

  after(() =>{
    server.kill();
  });

  it('returns "pong"', () => {
    fetch(`${baseUrl}/ping`)
      .then((response) => response.json())
      .then((result) => {
        expect(result).to.equal('pong');
      });
  });
});
