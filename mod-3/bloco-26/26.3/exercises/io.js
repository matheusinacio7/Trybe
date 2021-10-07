const fs = require('fs/promises');
const rootPath = './io';

const writeContentToFile = (fileName, fileContent) => new Promise((resolve, reject) => {
  fs.writeFile(`${rootPath}/${fileName}`, fileContent)
    .then(() => resolve('ok'))
    .catch(console.error);
});

module.exports = {
  writeContentToFile
};
