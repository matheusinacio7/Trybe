
import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { decode } from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import ms from 'ms';
import cp from 'child_process';
import * as jwt from 'jsonwebtoken';

import app from '../../app';

jest.mock('../../src/models/connect');
import connect, { disconnect } from '../../src/models/connect';

import { closeCacheServer } from '../../src/middlewares/withCache';
import { closeBlacklistServer } from '../../src/services/token';

import { SETTINGS } from '../../src/services/token';

const isEqualWithErrorMargin = (a : number, b : number, error : number) => {
  const absoluteDifference = Math.abs(a - b);
  return absoluteDifference < error;
}

afterAll(async () => {
  await closeCacheServer();
  await closeBlacklistServer();
  await disconnect();
});

const url = '/users/session';

describe('POST /users/session (login)', () => {
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
          const [value, ...rest] = fullDescription.split(';');
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
    it('invalid username', () => {
      return request(app)
        .post(url)
        .send({ username: 'kkk', password: validData.password })
        .expect(404)
        .expect((res) => {
          expect(res.body.error.code).toBe('not_found');
        });
    });

    it('invalid email', () => {
      return request(app)
        .post(url)
        .send({ email: 'vamo@nessa.com', password: validData.password })
        .expect(404)
        .expect((res) => {
          expect(res.body.error.code).toBe('not_found');
        });
    });

    it('invalid password', () => {
      return request(app)
        .post(url)
        .send({ email: validData.email, password: '123janetinha' })
        .expect(403)
        .expect((res) => {
          expect(res.body.error.code).toBe('forbidden');
        });
    });
  });

  describe('with valid data', () => {
    it('gets valid tokens with correct expiration', () => {
      return request(app)
        .post(url)
        .send({ username: validData.username, password: validData.password })
        .expect(200)
        .then((res) => {
          const cookies = (res.headers['set-cookie'] as Array<string>).reduce((acc : Record<string,string>, cookie : string) => {
            const [type, fullDescription] = cookie.split('=');
            const [value, ...rest] = fullDescription.split(';');
            acc[type] = value;
            return acc;
          }, {});

          const refresh = decode(cookies.refresh_token) as JwtPayload;
          expect(refresh.type).toBe('refresh');
          const refreshExp = Math.round(ms(SETTINGS.refresh_token_inactivity_lifetime) / 1000);
          const actualRefreshExp = (refresh.exp as number) - (refresh.iat as number);
          expect(isEqualWithErrorMargin(refreshExp, actualRefreshExp, 60)).toBe(true);
          
          const access = decode(cookies.access_token) as JwtPayload;
          expect(access.type).toBe('access');
          expect(access.admin).toBe(false);
          expect(access.username).toBe(validData.username);
          const accessExp = Math.round(ms(SETTINGS.access_token_lifetime) / 1000);
          const actualAccessExp = (access.exp as number) - (access.iat as number);
          expect(isEqualWithErrorMargin(accessExp, actualAccessExp, 10)).toBe(true);
        });
    });
  });
});

describe('DELETE /users/session (logout)', () => {
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

  it('with an invalid token, returns an error', async () => {
    const genPrivateKey = cp.spawn('openssl', ['ecparam', '-genkey', '-name', 'prime256v1', '-noout']);
    let privateKey = '';

    genPrivateKey.stdout.on('data', (chunk: Buffer) => {
      privateKey = chunk.toString();
    });

    await new Promise<void>((resolve) => {
      genPrivateKey.on('close', () => resolve());
    });

    const invalidToken = jwt.sign({ ...validData, type: 'access' }, privateKey, { algorithm: 'ES256', expiresIn: '3d' });

    await request(app)
      .delete(url)
      .set('Authorization', invalidToken)
      .expect(401)
      .then((res) => {
        expect(res.body.error.code).toBe('authorization_error');
      });
  });

  it('with a valid access token, revokes it and returns a warning', async () => {
    await request(app)
      .delete(url)
      .set('Authorization', accessToken)
      .expect(200)
      .then((res) => {
        expect(/warning/i.test(res.body.message)).toBe(true);
      });

    await request(app)
      .get('/users/me')
      .set('Authorization', accessToken)
      .expect(401)
      .then((res) => {
        expect(res.body.error.code).toBe('authorization_error');
      });
  });

  it('with a valid refresh token, invalidates the whole tree', async () => {
    await request(app)
      .delete(url)
      .set('Authorization', refreshToken);

    await request(app)
      .get('/users/me')
      .set('Authorization', accessToken)
      .expect(401)
      .then((res) => {
        expect(res.body.error.code).toBe('authorization_error');
      });
  });
});

describe('PUT /users/session (refresh)', () => {
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

  it('with an invalid token, returns an error', async () => {
    const genPrivateKey = cp.spawn('openssl', ['ecparam', '-genkey', '-name', 'prime256v1', '-noout']);
    let privateKey = '';

    genPrivateKey.stdout.on('data', (chunk: Buffer) => {
      privateKey = chunk.toString();
    });

    await new Promise<void>((resolve) => {
      genPrivateKey.on('close', () => resolve());
    });

    const invalidToken = jwt.sign({ ...validData, type: 'refresh' }, privateKey, { algorithm: 'ES256', expiresIn: '3d' });

    await request(app)
      .put(url)
      .set('Authorization', invalidToken)
      .expect(401)
      .then((res) => {
        expect(res.body.error.code).toBe('authorization_error');
      });
  });

  it('with an access token, returns an error', () => {
    return request(app)
      .put(url)
      .set('Authorization', accessToken)
      .expect(401)
      .then((res) => {
        expect(res.body.error.code).toBe('authorization_error');
      });
  });

  it('with a valid token, returns a new, valid, token pair', async () => {
    await request(app)
      .get('/users/me')
      .set('Authorization', accessToken)
      .expect(200);

    let newRefreshToken = '';
    let newAccessToken = '';

    await request(app)
      .put(url)
      .set('Authorization', refreshToken)
      .expect(200)
      .then((res) => {
        const cookies = (res.headers['set-cookie'] as Array<string>).reduce((acc : Record<string,string>, cookie : string) => {
          const [type, fullDescription] = cookie.split('=');
          const [value, ..._rest] = fullDescription.split(';');
          acc[type] = value;
          return acc;
        }, {});

        newRefreshToken = cookies.refresh_token;
        newAccessToken = cookies.access_token;
      });

    await request(app)
      .get('/users/me')
      .set('Authorization', newAccessToken)
      .expect(200);

    await request(app)
      .put(url)
      .set('Authorization', newRefreshToken)
      .expect(200);
  });
});
