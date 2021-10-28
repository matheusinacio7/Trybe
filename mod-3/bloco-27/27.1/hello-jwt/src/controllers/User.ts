import { User } from '@models';
import { validate } from '@validation';
import { getTokenPair, refreshTokenPair, revoke } from '@token';
import { compare, hash } from '@crypto';
import { ValidationError } from '@errors';

const mapPrivateInfo = ({ email, username, admin }: Record<string, unknown>) => ({ email, username, admin });

const create = (userData: any) => {
  validate('createUser', userData);

  return hash(userData.password)
    .then((hashedPassword) => User.insertOne({ ...userData, password: hashedPassword, admin: false }))
    .then(() => {
      const { username } = userData;
      const tokens = getTokenPair({ username, admin: false });
      return { ...tokens };
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
      const tokens = getTokenPair({ username: user.username, admin: user.admin });
      return { ...tokens };
    })
};

const logout = (authorization: string | undefined) => {
  if (!authorization) return Promise.resolve();

  try {
    const token = authorization.replace('Bearer ', '');
    const type = revoke(token);
    return Promise.resolve(type);
  } catch {
    // does not matter if token is invalid
    return Promise.resolve();
  }
};

const refresh = (authorization: string | undefined) => {
  if (!authorization) throw new ValidationError('Invalid token.');

  const token = authorization.replace('Bearer ', '');

  try {
    const tokenPair = refreshTokenPair(token);
    return Promise.resolve(tokenPair);
  } catch (err) {
    return Promise.reject(err);
  }
};

export default {
  create,
  getByUsername,
  login,
  logout,
  refresh,
};
