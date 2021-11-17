import ErrorWithCode from './ErrorWithCode';

export default class InternalError extends ErrorWithCode {
  constructor(message = 'Erro interno no servidor') {
    super({ message, code: 'server_error' });
  }
};
