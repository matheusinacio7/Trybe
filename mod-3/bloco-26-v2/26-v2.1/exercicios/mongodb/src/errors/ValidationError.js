import HttpError from './HttpError.js';

export default class ValidationError extends HttpError {
  constructor(message) {
    const [slug, field] = message.split(' ');
    const status = 400;
    let finalMessage = message;
    if (slug === 'missing') {
      finalMessage = `The field ${field} is required and was not informed.`;
    }

    super({ message: finalMessage, status });
  }
}
