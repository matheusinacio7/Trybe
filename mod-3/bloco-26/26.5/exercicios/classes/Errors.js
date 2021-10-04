class SelfNamedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class HttpError extends SelfNamedError {
  constructor({ message, status }) {
    super(message);
    this.status = status;
  }
}

export class MissingFieldError extends HttpError {
  constructor(field) {
    const status = 400;
    const message = `The field -${field}- is required and is missing.`;
    super({ status, message });
  }
}

export class InvalidFieldError extends HttpError {
  constructor(field, reason) {
    const status = 400;
    const message = `The field -${field}- is invalid, because it ${reason}.`;
    super({ status, message });
  }
}
