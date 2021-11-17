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

const url = '/users/me';

describe('GET /users/me', () => {
  const validData = {
    username: 'janete_corca',
    email: 'janete@corca.com',
    password: '123janete456corca',
  };

  let accessToken : string;
  let refreshToken : string;

  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(validData)
      .expect(201)
      .then((response) => {
        const cookies = (response.headers['set-cookie'] as Array<string>).reduce((acc : Record<string,string>, cookie : string) => {
          const [type, fullDescription] = cookie.split('=');
          const [value, ..._rest] = fullDescription.split(';');
          acc[type] = value;
          return acc;
        }, {});
        
        accessToken = cookies.access_token;
        refreshToken = cookies.refresh_token;
      })
  });

  afterEach(async () => {
    await connect()
      .then((db) => db.collection('users').deleteMany({}));
  });

  describe('throws error with invalid data', () => {
    it('invalid token', () => {
      return request(app)
        .get(url)
        .set('Authorization', refreshToken)
        .expect(401)
        .expect((res) => {
          expect(res.body.error.code).toBe('authorization_error');
        });
    });

    it('non-existing user', async () => {
      await connect()
        .then((db) => db.collection('users').deleteOne({ username: validData.username }));

      await request(app)
        .get(url)
        .set('Authorization', accessToken)
        .expect(404)
        .expect((res) => {
          expect(res.body.error.code).toBe('not_found');
        });
    });
  });

  describe('with correct data', () => {
    it('returns the user info', () => {
      return request(app)
        .get(url)
        .set('Authorization', accessToken)
        .expect(200)
        .expect((res) => {
          const { username, email, admin, password } = res.body;
          expect(username).toBe(validData.username);
          expect(email).toBe(validData.email);
          expect(admin).toBe(false);
          expect(password).toBe(undefined);
        });
    });
  });
});
