import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

import ValidationError from '../errors/ValidationError.js';

import createUserSchema from './schemas/createUser.json';
import editUserSchema from './schemas/editUser.json'

const ajv = new Ajv({ allErrors: true });

ajvErrors(ajv);

const schemas = {
  createUser: createUserSchema,
  editUser: editUserSchema,
};

const compiledSchemas = {
  createUser: null,
  editUser: null,
};

export default function validate(schema, data) {
  if (!schemas[schema]) {
    throw new Error('Invalid schema.');
  }

  if (!compiledSchemas[schema]) {
    compiledSchemas[schema] = ajv.compile(schemas[schema]);
  }

  const valid = compiledSchemas[schema](data);

  if (!valid) {
    throw new ValidationError(compiledSchemas[schema].errors[0].message);
  }
}
