import jwt from 'jsonwebtoken';

import type { SignOptions } from 'jsonwebtoken';

const CONFIG : SignOptions = {
  algorithm: 'ES256',
  expiresIn: '7d',
};

const sign = (data: Object) => {
  return jwt.sign(data, process.env.JWT_SECRET as string, CONFIG);
};

const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}

export default {
  sign,
  verify,
};