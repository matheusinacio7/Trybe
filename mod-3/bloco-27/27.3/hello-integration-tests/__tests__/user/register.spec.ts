import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../app';

jest.mock('../../src/models/connect');
import connect from '../../src/models/connect';

import { closeCacheServer } from '../../src/middlewares/withCache';
import { closeBlacklistServer } from '../../src/services/token';

afterAll(async () => {
  await closeCacheServer();
  await closeBlacklistServer();
});

const url = '/users';

describe('POST /users (register)', () => {
  const validData = {
    username: 'janete_corca',
    email: 'janete@corca.com',
    password: '123janete456corca',
  };

  describe('throws errors with invalid data', () => {
    it('empty body', () => {
      return request(app)
        .post(url)
        .send({})
        .expect(422)
        .expect((res) => {
          expect(res.body.error.code).toBe('invalid_data');
        });
    });

    it('invalid username', () => {
      return request(app)
        .post(url)
        .send({ username: 'kk', email: validData.email, password: validData.password })
        .expect(422)
        .expect((res) => {
          expect(res.body.error.code).toBe('invalid_data');
          expect(res.body.error.message.includes('username')).toBe(true);
        });
    });

    it('invalid email', () => {
      return request(app)
        .post(url)
        .send({ username: validData.username, email: 'janete', password: validData.password })
        .expect(422)
        .expect((res) => {
          expect(res.body.error.code).toBe('invalid_data');
          expect(res.body.error.message.includes('email')).toBe(true);
        });
    });

    it('invalid password', () => {
      return request(app)
        .post(url)
        .send({ username: validData.username, email: validData.email, password: '123' })
        .expect(422)
        .expect((res) => {
          expect(res.body.error.code).toBe('invalid_data');
          expect(res.body.error.message.includes('password')).toBe(true);
        });
    });
  });

  describe('correctly creates user with valid data', () => {
    it('returns message', () => {
      return request(app)
        .post(url)
        .send(validData)
        .expect(201)
        .expect((res) => {
          expect(/success|created|signedup/.test(res.body.message)).toBe(true);
        });
    });

    it('inserts user into the db with hashed password', () => {
      return request(app)
      .post(url)
      .send(validData)
      .expect(201)
      .then(connect)
      .then((db) => {
        return db.collection('users').findOne({ username: validData.username }) as Promise<any>;
      })
      .then(({ username, email, admin, password }) => {
        expect(username).toBe(validData.username);
        expect(email).toBe(validData.email);
        expect(password).not.toBe(validData.password);
        expect(admin).toBe(false);
      });
    })
  });
});
