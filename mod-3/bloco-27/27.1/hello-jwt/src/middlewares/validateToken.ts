import type { Handler } from 'express';

import { AuthorizationError } from '@errors';

import { verifyAccessToken } from '@token';

const validateToken : Handler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(new AuthorizationError('Token not found.'));

  const tokenBody = token.replace('Bearer ', '');

  try {
    const { username, admin } = verifyAccessToken(tokenBody);
    res.locals.username = username;
    res.locals.admin = admin;
    res.locals.token = tokenBody;
    next();
  } catch {
    next(new AuthorizationError('Invalid token.'));
  }
};

export default validateToken;
