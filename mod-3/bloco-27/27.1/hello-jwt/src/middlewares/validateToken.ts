import type { Handler } from 'express';

import { ValidationError } from '@errors';

import { verify } from '@token';

const validateToken : Handler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(new ValidationError('Token not found.'));

  try {
    const { username, admin } = verify(token.replace('Bearer ', ''));
    res.locals.username = username;
    res.locals.admin = admin;
    next();
  } catch {
    next(new ValidationError('Invalid token.'));
  }
};

export default validateToken;
