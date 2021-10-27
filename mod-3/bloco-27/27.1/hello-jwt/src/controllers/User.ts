import { User } from '@models';
import { validate } from 'src/services/validation';

import { sign } from '@token';

const create = (userData: any) => {
  validate('createUser', userData);

  return User.insertOne(userData)
    .then(() => {
      const { username } = userData;
      const newToken = sign({ username, admin: false });
      return { token: newToken };
    });
};

const getByUsername = (username: string) => {
  return Promise.resolve({ username, admin: false });
};

export default {
  create,
  getByUsername,
};
