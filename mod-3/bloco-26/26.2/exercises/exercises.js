const validateArithmetics = (a, b, c) => new Promise((resolve, reject) => {
  if (typeof a !== 'number' || typeof b !== 'number' || typeof c !== 'number') {
    return reject('Informe apenas numeros!');
  }

  const result = (a + b) * c;

  if (result < 50) {
    return reject('Valor muito baixo!');
  }

  resolve(result);
});

// validateArithmetics('opa', 3, 5).then(console.log).catch(console.error);
// validateArithmetics(1, 3, 5).then(console.log).catch(console.error);
// validateArithmetics(2, 5, 8).then(console.log).catch(console.error);

const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function validateWithRandomParams() {
  validateArithmetics(getRandomIntInclusive(1, 100), getRandomIntInclusive(1, 100), getRandomIntInclusive(1, 100))
    .then(console.log)
    .catch(console.error);
}

// validateWithRandomParams();

async function validateWithRandomParamsAsync() {
  try {
    const result = await validateArithmetics(getRandomIntInclusive(1, 100), getRandomIntInclusive(1, 100), getRandomIntInclusive(1, 100));
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}

// validateWithRandomParamsAsync();

const fs = require('fs');

const writeFilePromise = (path, content, options) => new Promise((resolve, reject) => {
  fs.writeFile(path, content, options, (err) => {
    if (err) {
      return reject(err);
    }

    resolve();
  });
});

function multipleFileWrite() {
  const strings = ['Finalmente', 'estou', 'usando', 'Promise.all', '!!!'];
  Promise.all(strings.map((value, index) => writeFilePromise(`./exercises/file${index + 1}.txt`, value)))
    .then(() => {
      console.log('Escreveu tudo');
    })
    .catch(console.error);
}

// multipleFileWrite();

const fsp = require('fs/promises');

function multipleFileRead() {
  fsp.readdir('./exercises')
    .then((files) => {
      const txtFiles = files.filter((file) => /(?<!All)\.txt$/.test(file));
      return Promise.all(txtFiles.map((filePath) => fsp.readFile(`./exercises/${filePath}`, 'utf-8')));
    })
    .then((contentArray) => {
      const fullString = contentArray.join(' ');
      return fsp.writeFile('./exercises/fileAll.txt', fullString);
    })
    .then(() => {
      console.log('Arquivo escrito com sucesso!');
    })
    .catch(console.error);
}

// multipleFileRead();

function printAllData() {
  fsp.readFile('./exercises/simpsons.json', 'utf-8')
    .then((characters) => JSON.parse(characters).forEach(({ id, name }) => console.log(`${id} - ${name}`)))
    .catch(console.error);
}

// printAllData();

const getCharacterById = (id) => new Promise((resolve, reject) => {
  fsp.readFile('./exercises/simpsons.json', 'utf-8')
    .then((characters) => {
      const character = JSON.parse(characters).find((char) => char.id == id);
      if (!character) {
        return reject('id não encontrado');
      }

      resolve(character);
    })
    .catch(reject);
});

// getCharacterById(6).then(console.log).catch(console.error);
// getCharacterById(24).then(console.log).catch(console.error);

function removeCharactersByIds(ids) {
  fsp.readFile('./exercises/simpsons.json', 'utf-8')
    .then((characters) => {
      const filteredArray = JSON.parse(characters).filter((char) => !ids.includes(parseInt(char.id, 10)));
      return fsp.writeFile('./exercises/simpsons.json', JSON.stringify(filteredArray, null, '\t'));
    })
    .catch(console.error);
}

// removeCharactersByIds([10, 6]);

function createSimpsonFamilyFile() {
  fsp.readFile('./exercises/simpsons.json', 'utf-8')
    .then((characters) => {
      const family = JSON.parse(characters).filter((char) => {
        const charId = parseInt(char.id, 10);
        return [1, 2, 3, 4].includes(charId);
      });
      return fsp.writeFile('./exercises/simpsonFamily.json', JSON.stringify(family, null, '\t'));
    })
    .catch(console.error);
}

// createSimpsonFamilyFile();

function addCharacterToFamilyByName(charName) {
  Promise.all([
    fsp.readFile('./exercises/simpsons.json', 'utf-8'),
    fsp.readFile('./exercises/simpsonFamily.json', 'utf-8')
  ])
    .then(([characters, family]) => {
      const character = JSON.parse(characters).find((char) => char.name === charName);
      const parsedFamily = JSON.parse(family);
      parsedFamily.push(character);
      return fsp.writeFile('./exercises/simpsonFamily.json', JSON.stringify(parsedFamily, null, '\t'));
    })
    .catch(console.error);
}

// addCharacterToFamilyByName('Nelson Muntz');

function substituteCharacterByName(charToBeSubstituted, charToSubsitute) {
  Promise.all([
    fsp.readFile('./exercises/simpsons.json', 'utf-8'),
    fsp.readFile('./exercises/simpsonFamily.json', 'utf-8')
  ])
    .then(([characters, family]) => {
      const character = JSON.parse(characters).find((char) => char.name === charToSubsitute);
      const parsedFamily = JSON.parse(family);
      const substitutedCharIndex = parsedFamily.findIndex((char) => char.name === charToBeSubstituted);
      parsedFamily.splice(substitutedCharIndex, 1, character);
      return fsp.writeFile('./exercises/simpsonFamily.json', JSON.stringify(parsedFamily, null, '\t'));
    })
    .catch(console.error);
}

// substituteCharacterByName('Nelson Muntz', 'Maggie Simpson');
