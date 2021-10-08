import connect from './connect.js';
import InternalError from '../errors/InternalError.js';

const createNew = (userData) => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('user').insertOne(userData);
    })
    .then(({ insertedId }) => {
      resolve({
        id: insertedId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.lastName
      });
    })
    .catch((err) => {
      const error = new InternalError('Erro ao criar usuário');
      error.reason = err;
      reject(err);
    });
});

export default {
  createNew,
};
