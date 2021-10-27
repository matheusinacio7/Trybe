import jwt from 'jsonwebtoken';
import fs from 'fs'

import type { SignOptions } from 'jsonwebtoken';

const SIGN_CONFIG : SignOptions = {
  algorithm: 'ES256',
  expiresIn: '7d',
};

const sign = (data: Object) => {
  return jwt.sign(data, fs.readFileSync('ec_private.pem', 'utf-8'), SIGN_CONFIG);
};

const verify = (token: string) => {
  return jwt.verify(token, fs.readFileSync('ec_public.pem', 'utf-8'));
}

export default {
  sign,
  verify,
};