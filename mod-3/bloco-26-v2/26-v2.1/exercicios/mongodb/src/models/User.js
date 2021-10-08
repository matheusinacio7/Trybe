import { ObjectId } from 'mongodb';

import connect from './connect.js';
import InternalError from '../errors/InternalError.js';

const externalInfoMap = (user) => {
  if (!user) return user;

  const { password, _id, ...rest } = user;
  return { id: _id, ...rest };
};

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
      const error = new InternalError('Error creating an user.');
      error.reason = err;
      reject(err);
    });
});

const getAll = () => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('user').find().toArray();
    })
    .then((users) => {
      resolve(users.map(externalInfoMap));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to get all users.');
      error.reason = err;
      reject(err);
    });
});

const getById = (id) => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('user').findOne(new ObjectId(id));
    })
    .then((user) => {
      resolve(externalInfoMap(user));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to get one user by Id.');
      error.reason = err;
      reject(err);
    })
});

export default {
  createNew,
  getAll,
  getById,
}
