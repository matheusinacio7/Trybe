import User from '../models/User.js';
import bcrypt from 'bcrypt';
import validate from '../validator/validate.js';

import NotFoundError from '../errors/NotFoundError.js';

const userNotFoundMessage = 'Usuário não encontrado.';

const SALT_ROUNDS = 10;

export const createNewUser = (userData) => new Promise((resolve, reject) => {
  validate('createUser', userData);

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

export const updateUser = (id, newData) => new Promise((resolve, reject) => {
  validate('editUser', newData);

  const { password, ...updatedData } = newData;

  const hashPasword = () => password ?  bcrypt.hash(newData.password, SALT_ROUNDS) : Promise.resolve('');

  hashPasword()
    .then((hashedPassword) => {
      if (hashedPassword) {
        updatedData.password = hashedPassword;
      }

      return User.updateUser(id, updatedData);
    })
    .then((updatedUser) => {
      if (!updatedUser) {
        reject(new NotFoundError(userNotFoundMessage));
      } else {
        resolve(updatedUser);
      }
    })
    .catch(reject);
});

export const deleteUser = (id) => new Promise((resolve, reject) => {
  User.deleteUser(id)
    .then(({ deletedCount }) => {
      if (!deletedCount) {
        reject(new NotFoundError(userNotFoundMessage));
      } else {
        resolve({ message: `User with id ${id} deleted successfully` })
      }
    })
    .catch(reject);
});
