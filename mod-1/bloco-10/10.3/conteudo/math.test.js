const { describe, test, expect  } = require('@jest/globals');

let { dividir, multiplicar, somar, subtrair } = require('./math');

//1. Faça o mock da funcão subtrair e teste sua chamada.
describe('fn subtrair', () => {
  test('É chamada corretamente', () => {
    subtrair = jest.fn();
    subtrair();

    expect(subtrair).toHaveBeenCalled();
  });
});



//2. Faça o mock da função multiplicar e implemente como retorno padrão o valor '10'. Teste a chamada e o retorno.

//3. Faça o mock da função somar e implemente uma função que recebe dois valores e retorna sua soma. Teste a chamada, o retorno e os parâmetros passados.

//4. Faça o mock da função dividir e implemente um retorno padrão com o valor '15'. Implemente também os seguintes valores para a primeira e segunda chamadas: '2' e '5'. Teste a chamada, o retorno, os parâmetros e quantas vezes a função foi chamada.

//5. Faça o mock da função subtrair de maneira que seja possível restaurar sua implementação original. Defina como retorno padrão o valor '20'. Teste o número de chamadas e o retorno. Restaure a implementação original da função e teste sua execução.
