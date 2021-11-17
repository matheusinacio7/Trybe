import express from 'express';
import fetch from 'node-fetch';

import validateToken from '../middlewares/validateToken.js';

const router = express.Router();

const apiUrl = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';

router.use(validateToken);

router.get('/price', (req, res, next) => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      next(err.message);
    });
});

export default router;
