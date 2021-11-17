import type { Handler } from 'express';

import { NotFoundError } from '@errors';

const catchInvalidEndpoint : Handler = (_req, _res, next) => {
  next(new NotFoundError('Invalid resource or method.'));
}

export default catchInvalidEndpoint;
