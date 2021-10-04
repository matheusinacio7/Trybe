import { HttpError } from '../classes/Errors.js';

export default function handleError(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Internal server error.' });
}
