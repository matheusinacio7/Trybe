import type { ErrorRequestHandler } from 'express';

import {
  HttpError,
  InternalError,
  NotFoundError,
  ValidationError,
} from '@errors';

const handleError : ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ ok: false, error: { message: err.message, code: err.code } });
  }

  switch (err.constructor) {
    case InternalError:
      console.log(err); // TODO create a server-side log file;
      return res.status(500).json({ ok: false, error: { message: err.message, code: err.code } });
    case ValidationError:
      return res.status(422).json({ ok: false, error: { message: err.message, code: err.code } });
    case NotFoundError:
      return res.status(404).json({ ok: false, error: { message: err.message, code: err.code } });
    default:
      console.log(err);
      return res.status(500).json({ ok: false, error: { message: 'An unexpected error ocurred.', code: 'unexpected_error' } });;
  }
}

export default handleError;
