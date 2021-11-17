import { describe, expect, it } from '@jest/globals';
import fs from 'fs';
import * as jwt from 'jsonwebtoken';
import ms from 'ms';
import cp from 'child_process';

import fakeTimers from '@sinonjs/fake-timers';

import * as token from '../../src/services/token';

const isEqualWithErrorMargin = (a : number, b : number, error : number) => {
  const absoluteDifference = Math.abs(a - b);
  return absoluteDifference < error;
};

let privateKey : string;
let publicKey : string;

const ec_keys = {
  get private() {
    if (privateKey) return privateKey;

    privateKey = fs.readFileSync('ec_private.pem', 'utf-8');
    return privateKey;
  },

  get public() {
    if (publicKey) return publicKey;

    publicKey = fs.readFileSync('ec_public.pem', 'utf-8');
    return publicKey;
  }
};

const genTempKeys = async () => {
  const genPrivateKey = cp.spawn('openssl', ['ecparam', '-genkey', '-name', 'prime256v1', '-noout', '-out', 'temp/ec_private.pem']);

  await new Promise<void>((resolve) => {
    genPrivateKey.on('close', () => resolve());
  });

  const genPublicKey = cp.spawn('openssl', ['ec', '-in', 'temp/ec_private.pem', '-pubout', '-out', 'temp/ec_public.pem' ]);

  await new Promise<void>((resolve) => {
    genPublicKey.on('close', () => resolve());
  });

  const [privateKey, publicKey] = await Promise.all([
    fs.promises.readFile('temp/ec_private.pem', 'utf-8'),
    fs.promises.readFile('temp/ec_public.pem', 'utf-8')
  ]);

  return { private: privateKey, public: publicKey };
};

afterAll(() => {
  token.closeBlacklistServer();
});

describe('Unit: token', () => {
  describe('getTokenPair returns a pair of access/refresh token with', () => {
    const dataPayload = { context: 'testing_unit' };

    it ('the right types', () => {
      const { accessToken, refreshToken } = token.getTokenPair(dataPayload);
      expect((jwt.decode(accessToken) as jwt.JwtPayload).type).toBe('access');
      expect((jwt.decode(refreshToken) as jwt.JwtPayload).type).toBe('refresh');
    });

    it ('the correct data', () => {
      const { accessToken, refreshToken } = token.getTokenPair(dataPayload);
      expect((jwt.decode(accessToken) as jwt.JwtPayload).context).toBe('testing_unit');
      expect((jwt.decode(refreshToken) as jwt.JwtPayload).context).toBe('testing_unit');
    });

    it('the right expiration times', () => {
      const { accessToken, refreshToken } = token.getTokenPair(dataPayload);
      const decodedRefreshToken = jwt.decode(refreshToken) as jwt.JwtPayload;
      const decodedAccessToken = jwt.decode(accessToken) as jwt.JwtPayload;

      const refreshExp = Math.round(ms(token.SETTINGS.refresh_token_inactivity_lifetime) / 1000);
      const actualRefreshExp = (decodedRefreshToken.exp as number) - (decodedRefreshToken.iat as number);
      expect(isEqualWithErrorMargin(refreshExp, actualRefreshExp, 60)).toBe(true);

      const accessExp = Math.round(ms(token.SETTINGS.access_token_lifetime) / 1000);
      const actualAccessExp = (decodedAccessToken.exp as number) - (decodedAccessToken.iat as number);
      expect(isEqualWithErrorMargin(accessExp, actualAccessExp, 10)).toBe(true);
    });

    it('a valid signature', () => {
      const { accessToken, refreshToken } = token.getTokenPair(dataPayload);
      expect(() => {
        jwt.verify(accessToken, ec_keys.public);
        jwt.verify(refreshToken, ec_keys.public);
      }).not.toThrow();
    });
  });

  describe('verifyAccessToken', () => {
    const dataPayload = { context: 'testing_unit' };

    it('rejects if the token was generated with a different secret', async () => {
      const genPrivateKey = cp.spawn('openssl', ['ecparam', '-genkey', '-name', 'prime256v1', '-noout']);
      let privateKey = '';

      genPrivateKey.stdout.on('data', (chunk: Buffer) => {
        privateKey = chunk.toString();
      });

      await new Promise<void>((resolve) => {
        genPrivateKey.on('close', () => resolve());
      });

      const invalidToken = jwt.sign({ ...dataPayload, type: 'access' }, privateKey, { algorithm: 'ES256', expiresIn: '3d' });

      await token.verifyAccessToken(invalidToken)
        .catch((err) => {
          expect(err.message).toBe('Invalid token.');
        });
    });

    it('rejects if the token is not access', () => {
      const { refreshToken } = token.getTokenPair(dataPayload);

      return token.verifyAccessToken(refreshToken)
        .catch((err) => {
          expect(err.message).toBe('Invalid token.');
        });
    });

    it('rejects if the token has expired', () => {
      const clock = fakeTimers.install();
      const { accessToken } = token.getTokenPair(dataPayload);
      const now = new Date();
      const then = new Date(now.getTime() + ms(token.SETTINGS.access_token_lifetime));

      clock.setSystemTime(then);

      return token.verifyAccessToken(accessToken)
        .catch((err) => {
          expect(err.message).toBe('Invalid token.');
          clock.uninstall();
        });
    });

    it('resolves with the payload if the token is valid', () => {
      const { accessToken } = token.getTokenPair(dataPayload);

      return token.verifyAccessToken(accessToken)
        .then((payload) => {
          expect(payload.context).toBe('testing_unit');
        });
    });
  });

  describe('refreshTokenPair', () => {
    const dataPayload = { context: 'testing_unit' };

    it('rejects if the param is an access token', async () => {
      const { accessToken } = token.getTokenPair(dataPayload);

      await expect(token.refreshTokenPair(accessToken)).rejects.toEqual(new Error('Invalid token.'));
    });

    it('rejects if the token is invalid', async () => {
      const genPrivateKey = cp.spawn('openssl', ['ecparam', '-genkey', '-name', 'prime256v1', '-noout']);
      let privateKey = '';

      genPrivateKey.stdout.on('data', (chunk: Buffer) => {
        privateKey = chunk.toString();
      });

      await new Promise<void>((resolve) => {
        genPrivateKey.on('close', () => resolve());
      });

      const invalidToken = jwt.sign({ ...dataPayload, type: 'refresh' }, privateKey, { algorithm: 'ES256', expiresIn: '3d' });

      await expect(token.refreshTokenPair(invalidToken)).rejects.toEqual(new Error('Invalid token.'));
    });

    it('rejects if the token has expired due to inactivity', async () => {
      const clock = fakeTimers.install();
      const { refreshToken } = token.getTokenPair(dataPayload);

      const now = new Date();
      const then = new Date(now.getTime() + ms(token.SETTINGS.refresh_token_inactivity_lifetime));
      clock.setSystemTime(then);

      await expect(token.refreshTokenPair(refreshToken)).rejects.toEqual(new Error('Invalid token.'));

      clock.uninstall();
    });

    it('resolves with a new token pair that is valid', async () => {
      const clock = fakeTimers.install();

      const { accessToken, refreshToken } = token.getTokenPair(dataPayload);

      await expect(token.verifyAccessToken(accessToken)).resolves.toBeDefined();

      const now = new Date();
      const then = new Date(now.getTime() + ms(token.SETTINGS.access_token_lifetime));
      clock.setSystemTime(then);
      
      await expect(token.verifyAccessToken(accessToken)).rejects.toBeDefined();

      const { accessToken: newAccessToken,  refreshToken: newRefreshToken } = await token.refreshTokenPair(refreshToken);

      await expect(token.verifyAccessToken(newAccessToken)).resolves.toBeDefined();
      await expect(token.refreshTokenPair(newRefreshToken)).resolves.toBeDefined();

      clock.uninstall();
    });

    it('resolves with a new refresh token with an exp time that cannot surpass the absolute lifetime for the tree', async () => {
      const clock = fakeTimers.install();

      const lifetimes = {
        absolute: ms(token.SETTINGS.refresh_token_absolute_lifetime),
        inactivity: ms(token.SETTINGS.refresh_token_inactivity_lifetime),
      };

      const now = new Date();
      const treeAbsoluteExp = new Date(now.getTime() + lifetimes.absolute).valueOf() / 1000;

      let cyclePeriod = lifetimes.inactivity;
      let cycles = Math.ceil(lifetimes.absolute / cyclePeriod);
      let areCyclesExact = lifetimes.absolute % cycles === 0;

      while(areCyclesExact) {
        cyclePeriod = Math.round(cyclePeriod * 0.95);
        cycles = Math.ceil(lifetimes.absolute / cyclePeriod);
        areCyclesExact = lifetimes.absolute % cycles === 0;
      }

      let { refreshToken } = token.getTokenPair(dataPayload);

      for (let i = 0; i < cycles - 2; i++) {
        clock.setSystemTime(new Date().valueOf() + cyclePeriod);
        const { refreshToken: newRefreshToken } = await token.refreshTokenPair(refreshToken);
        // console.log({ ...jwt.decode(newRefreshToken) as jwt.JwtPayload, treeAbsoluteExp });
        refreshToken = newRefreshToken;
      }

      const payload = jwt.decode(refreshToken) as jwt.JwtPayload;
      expect(isEqualWithErrorMargin(payload.exp as number, treeAbsoluteExp, 10000)).toBe(true);

      clock.uninstall();
    });

    it('revokes the previous refresh token', async () => {
      const { refreshToken } = token.getTokenPair(dataPayload);

      await expect(token.refreshTokenPair(refreshToken)).resolves.toBeDefined();

      await expect(token.refreshTokenPair(refreshToken)).rejects.toEqual(new Error('Invalid token.'));
    });

    it('invalidates the whole tree if a token is reused', async () => {
      const { accessToken, refreshToken } = token.getTokenPair(dataPayload);

      await expect(token.verifyAccessToken(accessToken)).resolves.toBeDefined();

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await token.refreshTokenPair(refreshToken);

      await expect(token.verifyAccessToken(newAccessToken)).resolves.toBeDefined();

      await expect(token.refreshTokenPair(refreshToken)).rejects.toEqual(new Error('Invalid token.'));

      await expect(token.verifyAccessToken(accessToken)).rejects.toEqual(new Error('Invalid token.'));
      await expect(token.verifyAccessToken(newAccessToken)).rejects.toEqual(new Error('Invalid token.'));
      await expect(token.refreshTokenPair(newRefreshToken)).rejects.toEqual(new Error('Invalid token.'));
    });
  });

  describe('revoke', () => {
    const dataPayload = { context: 'testing_unit' };

    it('correctly invalidates an access token', async () => {
      const { accessToken } = token.getTokenPair(dataPayload);

      await expect(token.verifyAccessToken(accessToken)).resolves.toBeDefined();

      await token.revoke(accessToken);

      await expect(token.verifyAccessToken(accessToken)).rejects.toEqual(new Error('Invalid token.'));
    });
  });
});
