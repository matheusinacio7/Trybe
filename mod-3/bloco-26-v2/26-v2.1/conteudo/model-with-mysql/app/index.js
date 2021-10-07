import express from 'express';

import Author from './models/Author.js';

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

app.listen(PORT, () => {
  console.log('Server up on port', PORT);
});
