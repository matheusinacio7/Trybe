import connection from './connection.js';
import InternalError from '../errors/InternalError.js';

const getDetailsByCep = (cep) => new Promise((resolve, reject) => {
  connection.execute(
  `
    SELECT cep, logradouro, bairro, localidade, uf
    FROM ceps
    WHERE cep = ?
  `, [cep])
    .then(([rows]) => {
      resolve(rows[0] || null);
    })
    .catch((err) => {
      const error = new InternalError('Error trying to get details by CEP');
      error.reason = err;
      reject(err);
    });
});

const insertNewAddress = (details) => new Promise((resolve, reject) => {
  connection.execute(
    `
      INSERT INTO ceps
        (cep, logradouro, bairro, localidade, uf)
      VALUES
        (?, ?, ?, ?, ?)
    `, [...Object.values(details)])
    .then(() => {
      resolve(details);
    })
    .catch((err) => {
      if (err.message.includes('Duplicate entry')) {
        reject({ error: true, message: 'Duplicated data' });
      } else {
        const error = new InternalError('Error trying to insert new details at the DB.');
        error.reason = err;
        reject(err);
      }
    });
});

export default {
  getDetailsByCep,
  insertNewAddress,
};
