const create = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3, maxLength: 100, },
    password: { type: 'string', minLength: 6, maxLength: 256 },
    // email pattern by https://emailregex.com/
    email: { type: 'string', maxLength: 256, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }
  },
  required: ['username', 'password', 'email'],
  additionalProperties: false,
};

export default {
  create,
};
