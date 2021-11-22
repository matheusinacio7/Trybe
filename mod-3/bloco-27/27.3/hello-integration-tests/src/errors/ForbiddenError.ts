import ErrorWithCode from './ErrorWithCode';

export default class Forbidden extends ErrorWithCode {
  constructor(message: string) {
    super({ message, code: 'forbidden' });
  }
};
