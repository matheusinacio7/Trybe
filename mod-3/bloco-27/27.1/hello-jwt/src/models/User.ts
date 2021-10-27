import type { Db, MongoServerError } from 'mongodb';

import connect from './connect';
import { ConflictError, NotFoundError } from '@errors';

const getCollection = (db : Db) => db.collection('users');

const insertOne = (userData: any) => connect()
  .then(getCollection)
  .then((collection) => {
    return collection.insertOne(userData);
  })
  .catch((err : MongoServerError) => {
    if (err.message.includes('duplicate key')) {
      throw new ConflictError('User already exists');
    }

    throw err;
  });

const getByUsername = (username: string) => connect()
  .then(getCollection)
  .then((collection) => collection.findOne({ username }))
  .then((result) => {
    if (!result) throw new NotFoundError('User not found');

    return result;
  });

const getByEmail = (email: string) => connect()
  .then(getCollection)
  .then((collection) => collection.findOne({ email }))
  .then((result) => {
    if (!result) throw new NotFoundError('User not found');

    return result;
  });

export default {
  insertOne,
  getByUsername,
  getByEmail,
};
