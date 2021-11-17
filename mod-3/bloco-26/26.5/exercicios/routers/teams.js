import express from 'express';
import fs from 'fs/promises';
import { HttpError, InvalidFieldError, MissingFieldError } from '../classes/Errors.js';

const router = express.Router();

const getAllTeams = () => fs.readFile('data/teams.json', 'utf-8')
  .then((rawData) => JSON.parse(rawData));

const saveTeams = (teams) => fs.writeFile('data/teams.json', JSON.stringify(teams, null, '\t'));

router.post('/', (req, res, next) => {
  const { name, initials, country, league = '' } = req.body;

  if (!name) {
    return next(new MissingFieldError('name'));
  }

  if (!initials) {
    return next(new MissingFieldError('initials'));
  }

  if (!country) {
    return next(new MissingFieldError('country'));
  }

  if (name.length < 6) {
    return next(new InvalidFieldError('name', 'must be longer than 5 characters'));
  }

  if (!/^[A-Z][A-Z][A-Z]$/.test(initials)) {
    return next(new InvalidFieldError('initials', 'must be exactly 3 uppercase characters'));
  }

  if (country.length < 4) {
    return next(new InvalidFieldError('country', 'must be longer than 3 characters'));
  }

  getAllTeams()
    .then((teams) => {
      teams.push({ name, initials, country, league });
      return saveTeams(teams);
    })
    .then(() => {
      res.status(201).json({ message: 'Team added successfully', team: { name, initials, country, league } });
    })
    .catch((err) => {
      next(new HttpError({ status: 500, message: 'Internal server error' }));
    });
});

router.get('/', (_req, res, next) => {
  getAllTeams()
    .then((teams) => {
      res.status(200).json(teams);
    })
    .catch((err) => {
      next(err);
    });
});

export default router;
