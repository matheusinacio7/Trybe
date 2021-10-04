import express from 'express';
import crypto from 'crypto';
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

function generateToken() {
  return crypto.randomBytes(6).toString('hex');
}

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new MissingFieldError('email'));
  }

  if (!password) {
    return next(new MissingFieldError('password'));
  }

  if (!validateEmail(email)) {
    return next(new InvalidFieldError('email', 'must be a valid email'));
  }

  if (!validatePassword(password)) {
    return next(new InvalidFieldError('password', 'must be only numbers and between 4 and 8 characters'));
  }

  return res.status(200).json({ token: generateToken() });
});

export default router;
