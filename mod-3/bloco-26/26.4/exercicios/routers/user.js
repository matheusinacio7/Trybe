const fs = require('fs/promises');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const router = require('express').Router();

const getAllUsers = () => fs.readFile('db/users.json').then((data) => JSON.parse(data));

const saveUsers = (data) => fs.writeFile('db/users.json', JSON.stringify(data, null, '\t'));

router.post('/', (req, res) => {
  const { email, password, firstName, phone } = req.body;

  if (!email || !password || !firstName || !phone) return res.status(401).json({ message: 'Missing fields' });

  Promise.all(
    [
      bcrypt.hash(password, SALT_ROUNDS),
      getAllUsers(),
    ])
    .then(([hashedPassword, allUsers]) => {
      const user = {
        firstName,
        phone,
        email,
        password: hashedPassword,
      };

      const existingUser = allUsers.find((user) => user.email === email);

      if (existingUser) return res.status(400).send({ message: 'This email is already in use.' });

      const newUsersArray = [...allUsers, user];

      return saveUsers(newUsersArray);
    })
    .then(() => res.status(201).send({ message: 'User created successfully' }))
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;
