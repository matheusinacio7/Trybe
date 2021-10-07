function checkPositive(number) {
  if (typeof number !== 'number') return 'o valor deve ser um número';
  if (number < 0) return 'negativo';
  if (number > 0) return 'positivo';
  return 'neutro';
}

module.exports = {
  checkPositive
};
