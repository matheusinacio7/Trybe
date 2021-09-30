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

router.post('/', (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) return res.status(400).json({ message: 'You need to inform an id and a name.'});

  getFile()
    .then((data) => {
      const newSimpsonId = '' + id;
      const index = data.findIndex((simpson) => simpson.id === id);

      if (index !== -1) return res.status(409).json({ message: 'Id already exists.' });

      data.push({ id: newSimpsonId, name });
      return saveFile(data);
    })
    .then(() => res.status(204).end())
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
