import jwt from 'jsonwebtoken';
import type { JwtPayload, SignOptions } from 'jsonwebtoken';
import fs from 'fs';
import { nanoid } from 'nanoid';

import { AuthorizationError } from '@errors';
import ms from 'ms';

// Refresh Token Activity Lifetime, explained in: https://auth0.com/blog/achieving-a-seamless-user-experience-with-refresh-token-inactivity-lifetimes/
// Refresh Token Rotation, explained in: https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/

type TokenType = 'access' | 'refresh';

export const SETTINGS = {
  access_token_lifetime: '30s',
  refresh_token_absolute_lifetime: '5m',
  refresh_token_inactivity_lifetime: '1m',
};

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

const getSignConfig = (type: TokenType, id: string, expiresIn?: string) : SignOptions => {
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

  return { ...SIGN_CONFIG[type], jwtid: id };
};

const sign = (data: Object, type: TokenType, id: string, expiresIn?: string) => {
  // console.log(getSignConfig(type, id));
  return jwt.sign(data, ec_keys.private, getSignConfig(type, id, expiresIn));
};
class Blacklist {
  #tree: Record<string, { r: number, a: number, invalid: boolean }>;

  constructor() {
    this.#tree = {};
  }

  add(branch: string, type: 'a' | 'r', counter: number) {
    if (!this.#tree[branch]) {
      this.#tree[branch] = { a: -1, r: -1, invalid: false };
    }

    this.#tree[branch][type] = counter;
  }

  checkAndInvalidateOnReuse(branch: string, type: 'a' | 'r', counter: number) {
    // if the base is not on the tree, the token is valid
    if (!this.#tree[branch]) return;

    // if the invalid property is set to true, reuse was detected and the whole branch is invalid
    if (this.#tree[branch].invalid) {
      throw new AuthorizationError('Invalid token.');
    }

    // if a refresh token is used while invalid, it means a reuse, so the whole branch is invalidated
    if (this.#tree[branch].r >= counter) {
      this.#tree[branch].invalid = true;
      throw new AuthorizationError('Invalid token.');
    }

    // access tokens can be invalid while the refresh token is not
    if (type === 'a' && this.#tree[branch].a >= counter) {
      throw new AuthorizationError('Invalid token.');
    }
  }

  get tree() {
    return this.#tree;
  }
}

const getBranchData = (token: string) : [string, 'a' | 'r', number] => {
  const { jti } = jwt.verify(token, ec_keys.public) as JwtPayload;

  const [base, type, counter] = (jti as string).split('.') as [string, 'a' | 'r', string];

  return [base, type, parseInt(counter)];
};

const getNewIdPair = (refreshToken?: string) => {
  if (!refreshToken) {
    const base = nanoid();
    return [`${base}.r.0`, `${base}.a.0`];
  }

  const [base, type, counter] = getBranchData(refreshToken);

  if (type !== 'r') {
    throw new AuthorizationError('Invalid token.');
  }

  return [`${base}.r.${counter + 1}`, `${base}.r.${counter + 1}`];
};


const blacklist = new Blacklist();

export const verifyAccessToken = (token: string) : JwtPayload => {
  const payload = (jwt.verify(token, ec_keys.public) as JwtPayload);

  if (payload.type !== 'access') {
    throw new AuthorizationError('Invalid token.');
  }

  blacklist.checkAndInvalidateOnReuse(...getBranchData(token));

  return payload;
};

export const getTokenPair = (data: Object, refreshExp?: string, token?: string) => {
  const [rtid, atid] = getNewIdPair(token);
  const refreshToken = sign({ ...data, type: 'refresh'}, 'refresh', rtid, refreshExp);
  const accessToken = sign({ ...data, type: 'access' }, 'access', atid);

  return { refreshToken, accessToken };
};

export const refreshTokenPair = (refreshToken: string) => {
  let payload : JwtPayload = {};

  try {
    payload = (jwt.verify(refreshToken, ec_keys.public) as JwtPayload);
  } catch {
    throw new AuthorizationError('Invalid token.');
  }

  if (payload.type !== 'refresh') {
    throw new AuthorizationError('Invalid token.');
  }

  const branchData = getBranchData(refreshToken);
  blacklist.checkAndInvalidateOnReuse(...branchData);
  blacklist.add(...branchData);

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

  return getTokenPair(payload, refreshExp, refreshToken);
}

const typeDict = {
  a: 'access',
  r: 'refresh',
};

export const revoke = (token: string) => {
  const branchData = getBranchData(token)
  blacklist.add(...branchData);
  return typeDict[branchData[1]];
};
