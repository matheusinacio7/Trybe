const userSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', pattern: '.+@.+\\..+' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['firstName', 'lastName', 'email', 'password'],
  additionalProperties: false,
  errorMessage: {
    required: {
      firstName: 'missing firstName',
      lastName: 'missing lastName',
      email: 'missing email',
      password: 'missing password',
    },
    properties: {
      email: 'É preciso informar um email válido.',
      password: 'A senha precisa ter no mínimo 6 caracteres.',
    },
  },
};

export default userSchema;
