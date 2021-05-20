const { describe, it, expect  } = require('@jest/globals');

let { dividir, multiplicar, somar, subtrair } = require('./math');

//1. Faça o mock da funcão subtrair e teste sua chamada.
describe('fn subtrair', () => {
  it('É chamada corretamente', () => {
    subtrair = jest.fn();
    subtrair();

    expect(subtrair).toHaveBeenCalled();
  });
});

//2. Faça o mock da função multiplicar e implemente como retorno padrão o valor '10'. Teste a chamada e o retorno.
describe('fn multiplicar', () => {
  multiplicar = jest.fn().mockReturnValue(10);

  it('Retorna 10', () => {
    expect(multiplicar()).toBe(10);
  });

  it('É chamada corretamente', () => {
    expect(multiplicar).toHaveBeenCalled();
  })
})

//3. Faça o mock da função somar e implemente uma função que recebe dois valores e retorna sua soma. Teste a chamada, o retorno e os parâmetros passados.
describe('fn somar', () => {
  somar = jest.fn((a, b) => a + b);

  it('Faz a soma corretamente', () => {
    expect(somar(4, 5)).toBe(9);
  });

  it('É chamada com os parâmetros corretos', () => {
    expect(somar).toHaveBeenCalledWith(4, 5);
  });
});

//4. Faça o mock da função dividir e implemente um retorno padrão com o valor '15'. Implemente também os seguintes valores para a primeira e segunda chamadas: '2' e '5'. Teste a chamada, o retorno, os parâmetros e quantas vezes a função foi chamada.
describe('fn dividr', () => {
  dividir = jest.fn().mockReturnValue('15');

  it('Sempre retorna a string "15" (??)', () => {
    expect(dividir('2')).toBe('15');
    expect(dividir('5')).toBe('15');
  });

  it('Foi chamada duas vezes', () => {
    expect(dividir).toHaveBeenCalledWith('2');
    expect(dividir).toHaveBeenCalledWith('5');
    expect(dividir).toHaveBeenCalledTimes(2);
  });
});

//5. Faça o mock da função subtrair de maneira que seja possível restaurar sua implementação original. Defina como retorno padrão o valor '20'. Teste o número de chamadas e o retorno. Restaure a implementação original da função e teste sua execução.
