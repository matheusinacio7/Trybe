import { Router } from 'express';

import { handleFileUpload, validateToken } from '@middlewares';

const router = Router();

// Should not have to spread
// see: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/51337
router.post('/', validateToken, ...handleFileUpload.cloudStorage, async (req, res, next) => {
  res.status(200).end();
});

export default router;
