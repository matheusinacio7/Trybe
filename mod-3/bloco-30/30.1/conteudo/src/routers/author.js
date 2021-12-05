const express = require('express');
const Controller = require('../controllers/Author');

const router = express.Router();

router.get('/', (_req, res) => {
  Controller.listAuthors()
    .then((authors) => {
      res.render('authors/index', { authors });
    });
});

module.exports = router;
