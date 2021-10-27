const create = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3, maxLength: 100, },
    password: { type: 'string', minLength: 6, maxLength: 256 },
    // email pattern by https://emailregex.com/
    email: { type: 'string', maxLength: 256, format: 'email' }
  },
  required: ['username', 'password', 'email'],
  additionalProperties: false,
};

export default {
  create,
};
