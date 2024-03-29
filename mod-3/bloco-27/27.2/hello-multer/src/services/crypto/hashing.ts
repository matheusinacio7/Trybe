import bcrypt from 'bcrypt';
import { ValidationError } from '@errors';

const SALT_ROUNDS = 10;

export const hash = (data: string) => bcrypt.hash(data, SALT_ROUNDS);

export const compare = (plainData: string, hashedData: string) => bcrypt.compare(plainData, hashedData)
  .then((result) => {
    if (result === false) throw new ValidationError('Invalid credentials.');

    return true;
  });