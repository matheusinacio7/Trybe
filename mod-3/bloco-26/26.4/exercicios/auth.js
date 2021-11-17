const fs = require('fs/promises');

const getAllUsers = () => fs.readFile('db/users.json').then((data) => JSON.parse(data));

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'Token inválido' });

  const token = authHeader.replace('Bearer ', '');

  if (token.length !== 16) return res.status(401).send({ message: 'Token inválido' });

  getAllUsers()
    .then((users) => {
      const user = users.find(({ tokens }) => tokens.includes(token));

      if (!user) return res.status(401).send({ message: 'Token inválido' });

      req.user = user;

      next();
    })
    .catch(() => {
      return res.status(500).end();
    });
};

module.exports = {
  authentication,
}
