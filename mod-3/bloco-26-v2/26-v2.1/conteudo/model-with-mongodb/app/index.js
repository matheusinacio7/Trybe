import express from 'express';

import Author from './models/Author.js';
import Book from './models/Book.js';

import ValidationError from './validator/ValidationError.js';

const app = express();

app.use(express.json());

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

app.post('/authors', (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    newAuthor.save()
      .then((result) => {
        res.status(201).json(result);
      });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ message: 'dados invalidos' });
    }
    return res.status(500).end();
  }
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

app.post('/books', (req, res) => {
  try {
    const newBook = new Book(req.body);
    newBook.save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: 'dados invalidos' });
      })
  } catch (err) {
    return res.status(400).json({ message: 'dados invalidos' });
  }
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
