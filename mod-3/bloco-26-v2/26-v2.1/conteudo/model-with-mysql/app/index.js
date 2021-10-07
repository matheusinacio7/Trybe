import express from 'express';

import Author from './models/Author.js';
import Book from './models/Book.js';

const app = express();

const PORT = process.env.PORT || 3001;

app.get('/authors', (req, res) => {
  Author.getAll()
    .then((authors) => {
      res.status(200).json(authors);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.get('/authors/:id', (req, res) => {
  Author.getById(req.params.id)
    .then((author) => {
      author
        ? res.status(200).json(author)
        : res.status(404).end()
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    })
});

app.get('/books', (req, res) => {
  if (req.query.author_id) {
    return Book.getByAuthorId(req.query.author_id)
      .then((books) => {
        res.status(200).json(books);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      })
  }

  Book.getAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

app.get('/books/:id', (req, res) => {
  Book.getById(req.params.id)
    .then((book) => {
      book
        ? res.status(200).json(book)
        : res.status(404).end()
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    })
})

app.listen(PORT, () => {
  console.log('Server up on port', PORT);
});
