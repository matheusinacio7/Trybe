import ErrorWithCode from './ErrorWithCode';

export default class AuthorizationError extends ErrorWithCode {
    constructor(message: string) {
    super({ message, code: 'authorization_error' });
  }
};
