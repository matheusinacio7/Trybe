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

export default {
  getDetailsByCep,
};
