export default class ErrorWithCode extends Error {
  code : string;

  constructor({ message, code } : Record<string, string>) {
    super(message);
    this.code = code;
  }
}

