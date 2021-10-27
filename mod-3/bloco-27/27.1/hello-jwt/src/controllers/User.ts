import { User } from '@models';
import { validate } from '@validation';
import { sign } from '@token';
import { compare, hash } from '@crypto';

const mapPrivateInfo = ({ email, username, admin }: Record<string, unknown>) => ({ email, username, admin });

const create = (userData: any) => {
  validate('createUser', userData);

  return hash(userData.password)
    .then((hashedPassword) => User.insertOne({ ...userData, password: hashedPassword, admin: false }))
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
      return Promise.all([Promise.resolve(user), compare(password, user.password)]);
    })
    .then(([user]) => {
      const newToken = sign({ username: user.username, admin: user.admin });
      return { token: newToken };
    })
}

export default {
  create,
  getByUsername,
  login,
};
