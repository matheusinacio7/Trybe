import { HttpError } from '../classes/Errors.js';

export default function validateToken(req, _res, next) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new HttpError({ message: 'Token is missing or invalid', status: 401 }));
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  console.log(token);

  if (!token || token.length !== 12) {
    return next(new HttpError({ message: 'Token is missing or invalid', status: 401 }));
  }

  next();
}
