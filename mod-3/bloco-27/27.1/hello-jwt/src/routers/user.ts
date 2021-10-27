import { Router } from 'express';

import { User } from '@controllers';
import { validateToken } from '@middlewares';

const router = Router();

const MINUTE_IN_MS = 1000 * 60;

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((token) => {
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * MINUTE_IN_MS,
      });
      res.status(201).json({ message: 'User created successfully.' });
    })
    .catch(next);
});

router.get('/me', validateToken, (_req, res, next) => {
  User.getByUsername(res.locals.username).then((info) => {
    res.status(200).json(info);
  })
  .catch(next);
});

export default router;
