import connect from './connect.js';
import InternalError from '../errors/InternalError.js';

const createNew = (userData) => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('user').insertOne(userData);
    })
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      console.log(err);
      reject(new InternalError());
    })
});

export default {
  createNew,
};
