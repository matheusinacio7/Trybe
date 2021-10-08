import InternalError from '../errors/InternalError.js';
import HttpError from '../errors/HttpError.js';

export default function handleError(err, _req, res, _next) {
  if (err instanceof InternalError) {
    console.log(err);
    return res.status(err.status).json({ error: true, message: err.message });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: true, message: err.message });
  }

  const error = new Error('Erro não capturado pelo fluxo.');
  error.reason = err;
  console.log(err);
  res.status(500).json({ error: true, message: 'Erro interno no servidor' });
}
