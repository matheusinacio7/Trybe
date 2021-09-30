const fs = require('fs/promises');
const router = require('express').Router();

const getFile = () => fs.readFile('db/simpsons.json', 'utf-8').then((data) => JSON.parse(data));

const saveFile = (data) => fs.writeFile('db/simpsons.json', JSON.stringify(data, null, '\t'));

router.get('/', (_, res) => {
  getFile()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

router.get('/:id', (req, res) => {
  getFile()
    .then((data) => {
      const simpson = data.find(({id}) => id == req.params.id);

      if (!simpson) return res.status(404).json({ message: 'Simpson not found' });

      return res.status(200).json(simpson);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
