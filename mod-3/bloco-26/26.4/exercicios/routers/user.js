const fs = require('fs/promises');
const { promisify } = require('util');
const randomBytesAsync = promisify(require('crypto').randomBytes);
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const router = require('express').Router();

const getAllUsers = () => fs.readFile('db/users.json').then((data) => JSON.parse(data));

const saveUsers = (data) => fs.writeFile('db/users.json', JSON.stringify(data, null, '\t'));

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error({
      status: 401,
      reason: 'Missing password or email field'
    }));
  }

  getAllUsers()
    .then((users) => {
      const userIndex = users.findIndex((user) => user.email === email);

      if (userIndex === -1) {
        throw new Error({ status: 403, reason: null });
      };

      return Promise.all([
        bcrypt.compare(password, users[userIndex].password),
        Promise.resolve(users),
        Promise.resolve(userIndex),
        randomBytesAsync(8).then((buffer) => buffer.toString('hex'))
      ])
    })
    .then(([passwordMatches, users, userIndex, token]) => {
      if (!passwordMatches) {
        throw new Error({ status: 403, reason: null });
      }

      users[userIndex].tokens.push(token);

      return Promise.all([
        Promise.resolve(token),
        saveUsers(users)
      ])
    })
    .then(([token]) => res.status(200).json({ token }))
    .catch(next);
});

router.post('/', (req, res, next) => {
  const { email, password, firstName, phone } = req.body;

  if (!email || !password || !firstName || !phone) {
    return next(new Error({ status: 401, reason: 'Missing fields' }));
  }

  Promise.all([
    bcrypt.hash(password, SALT_ROUNDS),
    getAllUsers(),
  ])
    .then(([hashedPassword, allUsers]) => {
      const user = {
        firstName,
        phone,
        email,
        password: hashedPassword,
        tokens: [],
      };

      const existingUser = allUsers.find((user) => user.email === email);

      if (existingUser) {
        throw new Error({ status: 400, reason: 'This email is already in use.' });
      }

      const newUsersArray = [...allUsers, user];

      return saveUsers(newUsersArray);
    })
    .then(() => res.status(201).send({ message: 'User created successfully' }))
    .catch(next);
});

router.use((err, req, res, next) => {
  return res.status(401).end();
});

module.exports = router;
