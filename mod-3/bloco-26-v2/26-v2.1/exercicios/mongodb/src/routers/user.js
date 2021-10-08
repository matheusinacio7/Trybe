import express from 'express';
import InternalError from '../errors/InternalError.js';
import { createNewUser, getAllUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/', (_req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  createNewUser(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

export default router;
