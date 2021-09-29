const fs = require('fs/promises');
const router = require('express').Router();

router.get('/', (_, res) => {
  fs.readFile('db/simpsons.json', 'utf-8')
    .then((data) => res.status(200).json(JSON.parse(data)))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
