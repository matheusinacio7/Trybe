import { User } from '@models';
import { validate } from 'src/services/validation';

import token from '@token';

const create = (userData: any) => {
  validate('createUser', userData);

  return User.insertOne(userData)
    .then(() => {
      const { username } = userData;
      const newToken = token.sign({ username, admin: false });
      return { token: newToken }
    });
};

export default {
  create,
};
