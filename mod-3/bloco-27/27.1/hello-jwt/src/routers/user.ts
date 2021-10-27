import { Router } from 'express';
import { User } from '@controllers';

const router = Router();

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((token) => {
      res.status(201).json({ token });
    })
    .catch(next);
});

export default router;
