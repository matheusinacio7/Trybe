import express from 'express';
import { MissingFieldError, InvalidFieldError } from '../classes/Errors.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

const router = express.Router();

router.post('/register', (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username) {
    return next(new MissingFieldError('username'));
  }

  if (!email) {
    return next(new MissingFieldError('email'));
  }

  if (!password) {
    return next(new MissingFieldError('password'));
  }

  if (username.length < 4) {
    return next(new InvalidFieldError('username', 'must be longer than 3 characters'));
  }

  if (!validateEmail(email)) {
    return next(new InvalidFieldError('email', 'must be a valid email'));
  }

  if (!validatePassword(password)) {
    return next(new InvalidFieldError('password', 'must be only numbers and between 4 and 8 characters'));
  }

  res.status(201).json({ message: 'User successfully created' });
});

export default router;
