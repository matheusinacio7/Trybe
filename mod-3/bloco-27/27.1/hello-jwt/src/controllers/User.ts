import { User } from '@models';
import { validate } from 'src/services/validation';

import { sign } from '@token';

const mapPrivateInfo = ({ email, username, admin }: Record<string, unknown>) => ({ email, username, admin });

const create = (userData: any) => {
  validate('createUser', userData);

  return User.insertOne({ ...userData, admin: false })
    .then(() => {
      const { username } = userData;
      const newToken = sign({ username, admin: false });
      return { token: newToken };
    });
};

const getByUsername = (username: string) => {
  return User.getByUsername(username)
    .then((user) => mapPrivateInfo(user));
};

const login = (userData: any) => {
  validate('loginUser', userData);

  const { email, username, password } = userData;

  const getUser = () => email ? User.getByEmail(email) : User.getByUsername(username);

  return getUser()
    .then((user) => {
      // bcrypt compare password
      const newToken = sign({ username: user.username, admin: user.admin });
      return { token: newToken };
    })
}

export default {
  create,
  getByUsername,
  login,
};
