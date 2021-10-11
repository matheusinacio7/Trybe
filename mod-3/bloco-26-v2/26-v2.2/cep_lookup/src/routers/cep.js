import express from 'express';
import validateCep from '../middlewares/validateCEP.js';

import { getDetailsByCep } from '../controllers/cep.js';

const router = express.Router();

router.get('/:cep', validateCep, (req, res, next) => {
  getDetailsByCep(req.params.cep)
    .then((details) => {
      res.status(200).json(details);
    })
    .catch(next);
});

export default router;
