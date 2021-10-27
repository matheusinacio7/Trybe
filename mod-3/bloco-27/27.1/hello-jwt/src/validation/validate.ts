import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

import { ValidationError } from '@errors';

const ajv = new Ajv({ allErrors: true });

ajvErrors(ajv);

const schemas = {
  // add your schemas here
  oneSchema: {},
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
    throw new ValidationError(compiledSchemas[schema].errors[0].message);
  }
}