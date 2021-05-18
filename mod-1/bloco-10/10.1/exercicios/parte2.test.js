const { describe, test, expect } = require('@jest/globals');
const { encode, decode, hydrate } = require('./parte2');

describe('Codifica e decodifica corretamente', () => {
  test('Funções existem', () => {
    expect(typeof encode).toBe('function');
    expect(typeof decode).toBe('function');
  });

  test('Codifica corretamente', () => {
    expect(encode('uopa, eai 11 78?')).toBe('54p1, 213 11 78?');
  });

  test('Decodifica corretamente', () => {
    expect(decode('54p1, 213 ee 78?')).toBe('uopa, eai ee 78?');
  });

  test('Mantém número de caracteres', () => {
    expect(decode('54p1, 213 78?').length).toBe('54p1, 213 78?'.length);
  })
});
