const express = require('express');
const Controller = require('../controllers/Author');

const router = express.Router();

router.get('/', (_req, res) => {
  Controller.getAll()
    .then((authors) => {
      res.status(200).render('author/index', { authors });
    });
});

router.get('/:id', (req, res) => {
  Controller.getById(req.params.id)
    .then((author) => {
      if (!author) return res.status(404).render('404');

      res.status(200).render('author/single');
    });
})

module.exports = router;
