const { describe, it, expect } = require('@jest/globals');
let { fetchJoke } = require('./bonus');

const expectedReturn = {
  'id': '7h3oGtrOfxc',
  'joke': 'Whiteboards ... are remarkable.',
  'status': 200,
};

describe('fn fetchJoke:', () => {
  it('Retorna uma piada corretamente', () => {
    fetchJoke = jest.fn().mockReturnValue(expectedReturn);
    expect(fetchJoke()).toEqual(expectedReturn);
  });
});
