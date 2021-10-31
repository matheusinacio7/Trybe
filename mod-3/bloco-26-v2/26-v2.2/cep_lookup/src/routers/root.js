import express from 'express';
const router = express.Router();

router.get('/ping', (_req, res, _next) => {
  res.status(200).send({ message: 'pong' });
});

export default router;
