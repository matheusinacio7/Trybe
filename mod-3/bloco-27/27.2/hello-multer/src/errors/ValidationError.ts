import ErrorWithCode from './ErrorWithCode';

export default class ValidationError extends ErrorWithCode {
  constructor(message: string) {
    super({ message, code: 'invalid_data' });
  }
};
