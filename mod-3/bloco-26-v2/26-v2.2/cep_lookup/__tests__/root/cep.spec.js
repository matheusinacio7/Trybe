import { describe, it } from "mocha";
import { expect } from "chai";
import fetch from 'node-fetch';
import connection from "../db/connection.js";
import startServer from '../helpers/startServer.js';

describe('GET /cep/:id', () => {
  let server = null;
  const baseUrl = `http://localhost:${process.env.PORT}/cep`;

  before(async () => {
    server = await startServer();
  });

  after(() => {
    server.kill();
  });

  it('When the CEP is invalid, returns an error message', () => {
    return fetch(`${baseUrl}/934849`)
      .then((response) => {
        expect(response.status).to.equal(400);
        return response.json();
      })
      .then((response) => {
        expect(response.message).to.equal('CEP inválido');
      });
  });

  it('When the CEP is not registered, returns a not found message', () => {
    return fetch(`${baseUrl}/75804800`)
      .then((response) => {
        expect(response.status).to.equal(404);
        return response.json();
      })
      .then((response) => {
        expect(response.message).to.equal('CEP não encontrado');
      });
  });

  it('When the CEP is valid, returns the details', () => {
    const validCepInfo = {
      cep: '74365-050',
      logradouro: 'Rua A4',
      bairro: 'Setor Novo Horizonte',
      localidade: 'Goiânia',
      uf: 'GO',
    };

    return connection.execute(
      `
        INSERT INTO ceps
          (cep, logradouro, bairro, localidade, uf)
        VALUES
          (?, ?, ?, ?, ?)
      `, [...Object.values(validCepInfo)])
      .then(() => {
        return fetch(`${baseUrl}/cep/${validCepInfo.cep}`);
      })
      .then((response) => {
        expect(response.status).to.equal(200);
        return response.json()
      })
      .then((result) => {
        expect(result.message).to.equal(validCepInfo);
      });
  });
});
