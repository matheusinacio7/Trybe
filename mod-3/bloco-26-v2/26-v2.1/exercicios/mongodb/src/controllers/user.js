import User from '../models/User.js';
import bcrypt from 'bcrypt';
import validate from '../validator/validate.js';

import NotFoundError from '../errors/NotFoundError.js';

const SALT_ROUNDS = 10;

export const createNewUser = (userData) => new Promise((resolve, reject) => {
  validate('user', userData);

  bcrypt.hash(userData.password, SALT_ROUNDS)
    .then((hashedPassword) => {
      return User.createNew({ ...userData, password: hashedPassword })
    })
    .then(resolve)
    .catch(reject);
});

export const getAllUsers = () => new Promise((resolve, reject) => {
  User.getAll()
    .then(resolve)
    .catch(reject);
});

export const getUserById = (id) => new Promise((resolve, reject) => {
  const userNotFoundMessage = 'Usuário não encontrado.';

  if (id.length !== 24) {
    reject(new NotFoundError(userNotFoundMessage));
  }

  User.getById(id)
    .then((user) => {
      if (!user) {
        reject(new NotFoundError(userNotFoundMessage));
      } else {
        resolve(user);
      }
    })
    .catch(reject);
});
