const fs = require('fs');
const mockfs = require('mock-fs');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const { writeContentToFile } = require('./io.js');

describe('A função writeContentToFile', () => {
  beforeEach(() => {
    mockfs({
      io: { /* empty */ }
    })
  });

  afterEach(() => {
    mockfs.restore();
  });

  it('escreve corretamente o conteúdo para um arquivo destino', async () => {
    const targetFileName = 'sinon.txt';
    const targetContent = 'A lightning bolt is pretty much the best weapon ever.';

    const returnedValue = await writeContentToFile(targetFileName, targetContent);

    const fileContent = fs.readFileSync(`./io/${targetFileName}`, 'utf-8');
    expect(returnedValue).to.equal('ok');
    expect(fileContent).to.equal(targetContent);
  });
});
