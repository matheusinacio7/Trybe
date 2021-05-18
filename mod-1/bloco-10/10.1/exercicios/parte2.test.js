const { describe, test, expect } = require('@jest/globals');
const { encode, decode, hydrate, techList } = require('./parte2');

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

describe('Testa a função techList', () => {
  it('Testa se a função techList é definida', () => {
    expect(techList).toBeDefined();
  });
  it('Testa se techList é uma função', () => {
    expect(typeof techList).toBe('function');
  });
  it('Lista com 5 tecnologias deve retornar uma lista de objetos ordenados', () => {
    expect(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Lucas')).toEqual([
      {
        tech: 'CSS',
        name: 'Lucas'
      },
      {
        tech: 'HTML',
        name: 'Lucas'
      },
      {
        tech: 'JavaScript',
        name: 'Lucas'
      },
      {
        tech: 'Jest',
        name: 'Lucas'
      },
      {
        tech: 'React',
        name: 'Lucas'
      }
    ]);
  });
  it('Lista com 0 tecnologias deve retornar uma mensagem de erro "Vazio!"', () => {
    expect(techList([], 'Lucas')).toBe('Vazio!');
  });
});

module.exports = techList;
