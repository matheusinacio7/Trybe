import User from '../models/User.js';
import validate from '../validator/validate.js';

export const createNewUser = (userData) => new Promise((resolve, reject) => {
  validate('user', userData);

  User.createNew(userData)
    .then(resolve)
    .catch(reject);
});
