import jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import { nanoid } from 'nanoid';

import { AuthorizationError } from '@errors';
import ms from 'ms';

// Refresh Token Activity Lifetime, explained in: https://auth0.com/blog/achieving-a-seamless-user-experience-with-refresh-token-inactivity-lifetimes/
// Refresh Token Rotation, explained in: https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/

type TokenType = 'access' | 'refresh';

const getIat = () => Math.round(new Date().getTime() / 1000);

let privateKey : string;
let publicKey : string;

const ec_keys = {
  get private() {
    if (privateKey) return privateKey;

    privateKey = fs.readFileSync('ec_private.pem', 'utf-8');
    return privateKey;
  },

  get public() {
    if (publicKey) return publicKey;

    publicKey = fs.readFileSync('ec_public.pem', 'utf-8');
    return publicKey;
  }
}

export const SETTINGS = {
  access_token_lifetime: '30s',
  refresh_token_absolute_lifetime: '1m',
  refresh_token_inactivity_lifetime: '30s',
};

const getSignConfig = (type: TokenType, id?: string, expiresIn?: string) : SignOptions => {
  const SIGN_CONFIG : Record<TokenType, SignOptions> = {
    'access': {
      algorithm: 'ES256',
      expiresIn: expiresIn || SETTINGS.access_token_lifetime,
    },
    'refresh': {
      algorithm: 'ES256',
      expiresIn: expiresIn || SETTINGS.refresh_token_inactivity_lifetime,
    },
  };

  return { ...SIGN_CONFIG[type], jwtid: id || nanoid() };
};

const sign = (data: Object, type: TokenType, id?: string, expiresIn?: string) => {
  // console.log(getSignConfig(type, id));
  return jwt.sign(data, ec_keys.private, getSignConfig(type, id, expiresIn));
};

const blackListTree : any = {}; // TODO move black list to in-memory db

export const verifyAccessToken = (token: string) : JwtPayload => {
  const payload = (jwt.verify(token, ec_keys.public) as JwtPayload);

  if (payload.type !== 'access'
    || blackListTree[payload.jti as string]
    || blackListTree[payload.parent as string]
    ) {
    throw new AuthorizationError('Invalid token.');
  }

  return payload;
};

export const getTokenPair = (data: Object, refreshExp?: string) => {
  const rtid = nanoid();
  const refreshToken = sign({ ...data, type: 'refresh'}, 'refresh', rtid, refreshExp);
  const accessToken = sign({ ...data, type: 'access', parent: rtid }, 'access');

  return { refreshToken, accessToken };
};

export const refreshTokenPair = (refreshToken: string) => {
  let payload : JwtPayload = {};

  try {
    payload = (jwt.verify(refreshToken, ec_keys.public) as JwtPayload);
  } catch {
    throw new AuthorizationError('Invalid token.');
  }

  if (payload.type !== 'refresh'
    || blackListTree[payload.jti as string]
    ) {
    throw new AuthorizationError('Invalid token.');
  }

  blackListTree[payload.jti as string] = payload.exp;

  // if token doesn't have an originally issued at, set it
  if (!payload.oiat) {
    payload.oiat = payload.iat;
  }

  const maxExp = payload.oiat + (ms(SETTINGS.refresh_token_absolute_lifetime) / 1000);

  // if the max exp is smaller than now, the token is invalid
  if (maxExp < getIat()) {
    throw new AuthorizationError('Invalid token.');
  }

  const nextExp = getIat() + (ms(SETTINGS.refresh_token_inactivity_lifetime) / 1000);

  let refreshExp : string | undefined = undefined;

  // if the absolute max exp is larger than the next inactivity exp, reduce inactivity lifetime
  if (nextExp > maxExp) {
    refreshExp = ms(maxExp - getIat());
  }
  
  delete payload.jti;
  delete payload.exp;
  delete payload.iat;
  delete payload.type;

  return getTokenPair(payload, refreshExp);
}

export const revoke = (token: string) => {
  const { jti, type, exp } = (jwt.verify(token, ec_keys.public) as JwtPayload);
  // console.log(parent, jwti);
  blackListTree[jti as string] = exp;
  return type;
};
