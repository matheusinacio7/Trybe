import Joi from 'joi';
import validate from '../validator/validate.js';

export default async function validateCep(req, _res, next) {
  console.log('VALIDATOR', req.params.cep);
  try {
    await validate('cep', req.params.cep);
  } catch(err) {
    next(err);
  }
  next();
}
