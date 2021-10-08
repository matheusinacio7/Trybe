import HttpError from './HttpError.js';

export default class InternalError extends HttpError {
  constructor(message) {
    super({ message: message || 'Internal server error.', status: 500 });
  }
}
