import { Router } from 'express';
import type { Response } from 'express';
import ms from 'ms';

import { User } from '@controllers';
import { validateToken, withCache } from '@middlewares';

import { SETTINGS } from '@token';

const router = Router();

const setTokensOnCookies = ({ accessToken, refreshToken } : Record<string, string>, res: Response) => {
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms(SETTINGS.access_token_lifetime),
  });
  res.cookie('refresh_token', refreshToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ms(SETTINGS.refresh_token_inactivity_lifetime),
  });
};

router.post('/session', (req, res, next) => {
  User.login(req.body)
    .then((tokens) => {
      setTokensOnCookies(tokens, res);
      res.status(200).json({ message: 'Logged in.' });
    })
    .catch(next);
});

router.delete('/session', (req, res, next) => {
  User.logout(req.headers.authorization)
    .then((tokenType: string) => {
      if (tokenType === 'access') {
        res.status(200).json({ message: 'Logged out with access token. WARNING: you should also revoke the refresh token.' });
      } else {
        res.status(200).json({ message: 'Logged out.' });
      }
    })
    .catch(next);
});

router.put('/session', (req, res, next) => {
  User.refresh(req.headers.authorization)
    .then((tokens) => {
      setTokensOnCookies(tokens, res);
      res.status(200).end();
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then((tokens) => {
      setTokensOnCookies(tokens, res);
      res.status(201).json({ message: 'User created successfully.' });
    })
    .catch(next);
});

router.get('/me', validateToken, withCache, (_req, res, next) => {
  User.getByUsername(res.locals.username).then((info) => {
    res.status(200).json(info);
  })
  .catch(next);
});

export default router;
