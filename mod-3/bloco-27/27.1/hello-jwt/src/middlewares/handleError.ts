import type { ErrorRequestHandler } from 'express';

import {
  AuthorizationError,
  ConflictError,
  HttpError,
  InternalError,
  NotFoundError,
  ValidationError,
} from '@errors';

const handleError : ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: { message: err.message, code: err.code } });
  }

  switch (err.constructor) {
    case InternalError:
      console.log(err); // TODO create a server-side log file;
      return res.status(500).json({ error: { message: err.message, code: err.code } });
    case AuthorizationError:
      return res.status(401).json({ error: { message: err.message, code: err.code } });
    case ConflictError:
      return res.status(409).json({ error: { message: err.message, code: err.code } });
    case NotFoundError:
      return res.status(404).json({ error: { message: err.message, code: err.code } });
    case ValidationError:
      return res.status(422).json({ error: { message: err.message, code: err.code } });
    default:
      console.log(err);
      return res.status(500).json({ error: { message: 'An unexpected error ocurred.', code: 'unexpected_error' } });;
  }
}

export default handleError;
