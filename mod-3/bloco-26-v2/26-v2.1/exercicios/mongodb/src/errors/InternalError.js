import HttpError from './HttpError';

export default class InternalError extends HttpError {
  constructor(message) {
    super({ message: message || 'Erro interno no servidor.', status: 500 });
  }
}
