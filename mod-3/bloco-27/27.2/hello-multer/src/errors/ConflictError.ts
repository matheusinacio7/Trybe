import ErrorWithCode from './ErrorWithCode';

export default class NotFoundError extends ErrorWithCode {
    constructor(message: string) {
    super({ message, code: 'conflict' });
  }
};
