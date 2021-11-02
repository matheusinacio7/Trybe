import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../app';

import { closeCacheServer } from '../../src/middlewares/withCache';
import { closeBlacklistServer } from '../../src/services/token';

afterAll(async () => {
  await closeCacheServer();
  await closeBlacklistServer();
});

describe('GET /ping', () => {
  it('Correctly returns pong', (done) => {
    request(app)
      .get('/ping')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect({ message: 'pong' }, done);
  });
});
