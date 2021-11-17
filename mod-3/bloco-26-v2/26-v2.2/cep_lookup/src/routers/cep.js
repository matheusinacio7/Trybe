import express from 'express';
import validateCep from '../middlewares/validateCEP.js';
import NotFoundError from '../errors/NotFoundError.js';

import { getDetailsByCep, insertAddress } from '../controllers/cep.js';

const router = express.Router();

router.post('/', (req, res, next) => {
  insertAddress(req.body)
    .then((details) => {
      res.status(201).json(details);
    })
    .catch(next);
});

router.get('/:cep', validateCep, (req, res, next) => {
  getDetailsByCep(req.params.cep)
    .then((details) => {
      if (!details) throw new NotFoundError('CEP não encontrado');
      res.status(200).json(details);
    })
    .catch(next);
});

export default router;
