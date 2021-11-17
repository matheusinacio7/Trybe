import { describe, it } from "mocha";
import { expect } from "chai";
import fetch from 'node-fetch';
import connection from "./db/connection.js";
import startServer from './helpers/startServer.js';

after(() => {
  connection.end();
});

describe('GET /cep/:id', () => {
  let server = null;
  const baseUrl = `http://localhost:${process.env.PORT}/cep`;

  const validCepInfo = {
    cep: '74365050',
    logradouro: 'Rua A4',
    bairro: 'Setor Novo Horizonte',
    localidade: 'Goiânia',
    uf: 'GO',
  };

  before(async () => {
    server = await startServer();
  });

  afterEach(async () => {
    await connection.execute(`TRUNCATE ceps`);
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
      .then((result) => {
        expect(result.error).to.be.true;
        expect(result.message).to.equal('CEP inválido');
      });
  });

  it('When the CEP is not registered, finds details in an external API and inserts into the DB, returning the results', () => {
    return fetch(`${baseUrl}/74365050`)
      .then((response) => {
        expect(response.status).to.equal(200);
        return response.json();
      })
      .then((result) => {
        expect(result.error).to.be.undefined;
        expect(result).to.deep.equal({ ...validCepInfo, cep: '74365-050'});
        return connection.execute(
          `
            SELECT cep, logradouro, bairro, localidade, uf
            FROM ceps
            WHERE cep = ?
          `, [validCepInfo.cep])
      })
      .then(([rows]) => {
        expect(rows[0]).to.deep.equal(validCepInfo);
      })
  });

  it('When the CEP is valid, returns the details', () => {
    return connection.execute(
      `
        INSERT INTO ceps
          (cep, logradouro, bairro, localidade, uf)
        VALUES
          (?, ?, ?, ?, ?)
      `, [...Object.values(validCepInfo)])
      .then(() => {
        return fetch(`${baseUrl}/${validCepInfo.cep}`);
      })
      .then((response) => {
        expect(response.status).to.equal(200);
        return response.json()
      })
      .then((result) => {
        expect(result.error).to.be.undefined;
        expect(result).to.deep.equal({ ...validCepInfo, cep: '74365-050'});
      });
  });
});

describe('POST /cep', () => {
  let server = null;
  const baseUrl = `http://localhost:${process.env.PORT}/cep`;

  const validCepInfo = {
    cep: '74365050',
    logradouro: 'Rua A4',
    bairro: 'Setor Novo Horizonte',
    localidade: 'Goiânia',
    uf: 'GO',
  };

  before(async () => {
    server = await startServer();
  });

  afterEach(async () => {
    await connection.execute(`TRUNCATE ceps`);
  });

  after(() => {
    server.kill();
  });

  describe('When a field is missing, returns an error', () => {
    it('missing cep', () => {
      const deletedField = 'cep';

      const invalidCepInfo = { ...validCepInfo };
      delete invalidCepInfo[deletedField];

      return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(invalidCepInfo) })
        .then((response) => {
          expect(response.status).to.equal(400);
          return response.json();
        })
        .then((result) => {
          expect(result.error).to.be.true;
          expect(result.message).to.equal(`O campo "${deletedField}" é obrigatório e não foi informado.`);
        });
    });
    
    it('missing logradouro', () => {
      const deletedField = 'logradouro';

      const invalidCepInfo = { ...validCepInfo };
      delete invalidCepInfo[deletedField];

      return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(invalidCepInfo) })
        .then((response) => {
          expect(response.status).to.equal(400);
          return response.json();
        })
        .then((result) => {
          expect(result.error).to.be.true;
          expect(result.message).to.equal(`O campo "${deletedField}" é obrigatório e não foi informado.`);
        });
    });
    
    it('missing logradouro', () => {
      const deletedField = 'logradouro';

      const invalidCepInfo = { ...validCepInfo };
      delete invalidCepInfo[deletedField];

      return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(invalidCepInfo) })
        .then((response) => {
          expect(response.status).to.equal(400);
          return response.json();
        })
        .then((result) => {
          expect(result.error).to.be.true;
          expect(result.message).to.equal(`O campo "${deletedField}" é obrigatório e não foi informado.`);
        });
    });
    
    it('missing bairro', () => {
      const deletedField = 'bairro';

      const invalidCepInfo = { ...validCepInfo };
      delete invalidCepInfo[deletedField];

      return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(invalidCepInfo) })
        .then((response) => {
          expect(response.status).to.equal(400);
          return response.json();
        })
        .then((result) => {
          expect(result.error).to.be.true;
          expect(result.message).to.equal(`O campo "${deletedField}" é obrigatório e não foi informado.`);
        });
    });
    
    it('missing uf', () => {
      const deletedField = 'uf';

      const invalidCepInfo = { ...validCepInfo };
      delete invalidCepInfo[deletedField];

      return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(invalidCepInfo) })
        .then((response) => {
          expect(response.status).to.equal(400);
          return response.json();
        })
        .then((result) => {
          expect(result.error).to.be.true;
          expect(result.message).to.equal(`O campo "${deletedField}" é obrigatório e não foi informado.`);
        });
    });
  });

  it('When the CEP is invalid, returns an error', () => {
    const invalidCepInfo = { ...validCepInfo, cep: '7589823' };

    return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(invalidCepInfo) })
      .then((response) => {
        expect(response.status).to.equal(400);
        return response.json();
      })
      .then((result) => {
        expect(result.error).to.be.true;
        expect(result.message).to.equal(`CEP inválido`);
      });
  });

  it('If the address is already registered, returns an error', () => {
    return connection.execute(
      `
        INSERT INTO ceps
          (cep, logradouro, bairro, localidade, uf)
        VALUES
          (?, ?, ?, ?, ?)
      `, [...Object.values(validCepInfo)])
      .then(() => {
        return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(validCepInfo) });
      })
      .then((response) => {
        expect(response.status).to.equal(409);
        return response.json()
      })
      .then((result) => {
        expect(result.error).to.be.true;
        expect(result.message).to.deep.equal('CEP já cadastrado no banco');
      });
  });

  it('With valid data, registers on the DB and returns the new data', () => {
    return fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(validCepInfo) })
      .then((response) => {
        expect(response.status).to.equal(201);
        return response.json();
      })
      .then((result) => {
        expect(result.error).to.be.undefined;
        expect(result).to.deep.equal({ ...validCepInfo, cep: '74365-050'});
        return connection.execute(
          `
            SELECT cep, logradouro, bairro, localidade, uf
            FROM ceps
            WHERE cep = ?
          `, [validCepInfo.cep]
        );
      })
      .then(([rows]) => {
        expect(rows[0]).to.deep.equal(validCepInfo);
      });
  });
});
