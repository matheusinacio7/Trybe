import { Router } from 'express';

import { Ping } from '@controllers';

const router = Router();

router.get('/ping', (_req, res, next) => {
  Ping.ping()
    .then((message) => {
      res.status(200).json({ message });
    })
    .catch(next);
});

export default router;
