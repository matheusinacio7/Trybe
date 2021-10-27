import jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import fs from 'fs'

const SIGN_CONFIG : SignOptions = {
  algorithm: 'ES256',
  expiresIn: '7d',
};

export const sign = (data: Object) => {
  return jwt.sign(data, fs.readFileSync('ec_private.pem', 'utf-8'), SIGN_CONFIG);
};

export const verify = (token: string) : JwtPayload => {
  return (jwt.verify(token, fs.readFileSync('ec_public.pem', 'utf-8')) as JwtPayload);
}
