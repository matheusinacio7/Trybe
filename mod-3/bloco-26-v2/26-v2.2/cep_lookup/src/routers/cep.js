import express from 'express';
import validateCep from '../middlewares/validateCEP.js';
import NotFoundError from '../errors/NotFoundError.js';

import { getDetailsByCep } from '../controllers/cep.js';

const router = express.Router();

router.get('/:cep', validateCep, (req, res, next) => {
  getDetailsByCep(req.params.cep)
    .then((details) => {
      if (!details) throw new NotFoundError('CEP não encontrado');
      res.status(200).json(details);
    })
    .catch(next);
});

export default router;
