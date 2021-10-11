import HttpError from './HttpError.js';

export default class ValidationError extends HttpError {
  constructor(message) {
    const [field, slug] = message.split(' is ');
    const status = 400;
    let finalMessage = message;
    if (slug === 'required') {
      finalMessage = `O campo ${field} é obrigatório e não foi informado.`;
    }

    super({ message: finalMessage, status });
  }
}
