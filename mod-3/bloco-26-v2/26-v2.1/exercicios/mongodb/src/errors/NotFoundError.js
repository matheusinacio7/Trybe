import HttpError from './HttpError.js';

export default class NotFoundError extends HttpError {
  constructor(message) {
    super({ message, status: 404 });
  }
}
