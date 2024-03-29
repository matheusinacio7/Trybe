const express = require('express');
const Controller = require('../controllers/Author');

const router = express.Router();

router.get('/', (_req, res) => {
  Controller.getAll()
    .then((authors) => {
      res.status(200).render('authors/index', { authors });
    });
});

router.get('/new', (_req, res) => {
  res.render('authors/new', { message: null });
});

router.post('/', (req, res) => {
  Controller.create(req.body)
    .then(() => {
      res.redirect('authors');
    })
    .catch(() => {
      res.status(400).render('authors/new', { message: 'Dados inválidos' });
    });
});

router.get('/:id', (req, res) => {
  Controller.getById(req.params.id)
    .then((author) => {
      if (!author) return res.status(404).render('404');

      res.status(200).render('authors/single', { author });
    });
})

module.exports = router;
