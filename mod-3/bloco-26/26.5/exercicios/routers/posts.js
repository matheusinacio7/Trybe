import express from 'express';
import { HttpError, MissingFieldError } from '../classes/Errors.js';

const router = express.Router();

let posts = [];

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    return next(new MissingFieldError('id'));
  }

  const requestedPost = posts.find((post) => post.id === id);

  if (!requestedPost) {
    return next(new HttpError({ status: 404, message: 'Post não encontrado.' }));
  }

  res.status(200).json(requestedPost);
});

router.get('/', (_req, res, _next) => {
  return res.status(200).json(posts);
});

export default router;
