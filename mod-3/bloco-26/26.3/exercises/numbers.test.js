const { describe, it } = require('mocha');
const { expect } = require('chai');
const { checkPositive } = require('./numbers');

describe('A função checkPositive, ', () => {
  describe("quando o numero é maior que zero:", () => {
    it('retorna "positivo"', () => {
      const expectedReturn = 'positivo';

      expect(checkPositive(10)).to.equal(expectedReturn);
      expect(checkPositive(0.1)).to.equal(expectedReturn);
    });
  });

  describe("quando o numero é igual que zero:", () => {
    it('retorna "neutro"', () => {
      const expectedReturn = 'neutro';

      expect(checkPositive(0)).to.equal(expectedReturn);
      expect(checkPositive(0.0000)).to.equal(expectedReturn);
    });
  });

  describe("quando o numero é menor que zero:", () => {
    it('retorna "negativo"', () => {
      const expectedReturn = 'negativo';

      expect(checkPositive(-10)).to.equal(expectedReturn);
      expect(checkPositive(-0.1)).to.equal(expectedReturn);
    });
  });
});

