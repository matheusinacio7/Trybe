import Joi from 'joi';
import ValidationError from '../errors/ValidationError.js';

const SCHEMAS = {
  cep: Joi
    .string()
    .pattern(/\d{5}-?\d{3}/)
    .messages({
      'string.pattern.base': 'CEP inválido',
    }),
  insert_address: Joi
    .object({
      cep: Joi.string().pattern(/\d{5}-?\d{3}/).required(),
      logradouro: Joi.string().required(),
      bairro: Joi.string().required(),
      localidade: Joi.string().required(),
      uf: Joi.string().length(2).uppercase().required(),
    })
    .messages({
      'string.pattern.base': 'CEP inválido',
    }),
};

export default async function validate(schema, data) {
  const compiledSchema = SCHEMAS[schema];

  try {
    await compiledSchema.validateAsync(data, {  });
  } catch (err) {
    throw new ValidationError(err.details[0].message);
  }
}
