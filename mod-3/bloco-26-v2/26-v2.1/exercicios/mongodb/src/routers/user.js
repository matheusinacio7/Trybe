import express from 'express';
import { createNewUser } from '../controllers/user';

const router = express.Router();

router.post('/', (req, res, next) => {
  createNewUser(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

export default router;
