import HttpError from './HttpError.js';

export default class ValidationError extends HttpError {
  constructor(message) {
    const [slug, field] = message.split(' ');
    const status = 400;
    let finalMessage = message;
    if (slug === 'missing') {
      finalMessage = `O campo ${field} é obrigatório e não foi informado.`;
    }

    super({ message: finalMessage, status });
  }
}
