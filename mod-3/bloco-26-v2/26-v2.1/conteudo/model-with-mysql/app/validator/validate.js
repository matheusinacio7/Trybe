import Ajv from 'ajv';
import ValidationError from './ValidationError.js';
const ajv = new Ajv();

export default function validate(schema, data) {
  const ajvValidate = ajv.compile(schema);

  const valid = ajvValidate(data);

  if (!valid) {
    throw new ValidationError('validation error');
  }
}

