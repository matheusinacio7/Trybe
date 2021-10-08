import User from '../models/User.js';
import bcrypt from 'bcrypt';
import validate from '../validator/validate.js';

const SALT_ROUNDS = 10;

export const createNewUser = (userData) => new Promise((resolve, reject) => {
  validate('user', userData);

  bcrypt.hash(userData.password, SALT_ROUNDS)
    .then((hashedPassword) => {
      return User.createNew({ ...userData, password: hashedPassword })
        .then(resolve)
        .catch(reject);
    })
    .catch(reject);
});
