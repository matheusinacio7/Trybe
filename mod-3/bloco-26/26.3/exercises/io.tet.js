const fs = require('fs');
const fsp = require('fs/promises');

const { describe, it } = require('mocha');
const { expect } = require('chai');
const { stub } = require('sinon');

const { writeContentToFile } = require('./io.js');

describe('A função writeContentToFile', () => {
  it('escreve corretamente o conteúdo para um arquivo destino', async () => {
    const targetFileName = 'sinon.txt';
    const targetContent = 'A lightning bolt is pretty much the best weapon ever.';
    const spies = [];
    spies.push(stub(fs, 'writeFile').returns(undefined));
    spies.push(stub(fs, 'writeFileSync').returns(undefined));
    spies.push(stub(fsp, 'writeFile').resolves(undefined));

    const result = await writeContentToFile(targetFileName, targetContent);

    expect(true).to.satisfy(() => {
      for (let i = 0; i < spies.length; i += 1) {
        if (spies[i].calledWithMatch(`./io/${targetFileName}`), targetContent) {
          return true;
        }
      }
      return false;
    });

    expect(result).to.equal('ok');
  });
});
