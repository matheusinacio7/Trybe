import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

import { ValidationError } from '@errors';

import { user as userSchemas } from './schemas';

const ajv = new Ajv({ allErrors: true });

addErrors(ajv);
addFormats(ajv);

const schemas = {
  createUser: userSchemas.create,
  loginUser: userSchemas.login,
};

type CompiledSchemas = {
  [Property in keyof typeof schemas] : any | null;
};

const compiledSchemas : Partial<CompiledSchemas> = {};

export default function validate(schema: keyof typeof schemas, data: any) {
  if (!schemas[schema]) {
    throw new Error('Invalid schema.');
  }

  if (!compiledSchemas[schema]) {
    compiledSchemas[schema] = ajv.compile(schemas[schema]);
  }

  const valid = compiledSchemas[schema](data);
  
  if (!valid) {
    const error = compiledSchemas[schema].errors[0];
    const message = `"${error.instancePath.replace('/', '')}" ${error.message}`;
    throw new ValidationError(message);
  }
}