import ErrorWithCode from './ErrorWithCode';

export default class HttpError extends ErrorWithCode {
  status : number;

  constructor({ status, message, code } : { status: number, message: string, code: string }) {
    super({ message, code });
    this.status = status;
  }
};
