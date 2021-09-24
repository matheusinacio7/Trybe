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

multipleFileRead();
