const express = require('express');
const router = express.Router();

router.get('/ping', (_, res) => res.status(200).json({ message: 'pong' }));

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'É preciso fornecer um nome de usuário.' });

  if (req.user) {
    req.user.name = name;
  } else {
    req.user = { name };
  }

  next();
}

const sayHello = (req, res) => res.status(200).json({ message: `Hello, ${req.user.name}` });

router.post('/hello', validateName, sayHello);

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age < 18) return res.status(401).json({ message: 'Unauthorized' });

  next();
}

router.post('/greetings', validateName, validateAge, sayHello);

router.put('/users/:name/:age', (req, res) => {
  const { name, age } = req.params;

  return res.status(200).json({ message: `Seu nome é ${name} e você tem ${age} anos de idade` });
});

module.exports = router;
