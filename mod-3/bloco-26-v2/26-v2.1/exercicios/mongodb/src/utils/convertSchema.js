import fs from 'fs/promises';

function getSchemaFileName() {
  const fileName = process.argv[2];

  if (!fileName) {
    throw new Error('Please inform a valid schema filename.');
  }

  return fileName;
}

const convertSchema = (fileName) => new Promise((resolve, reject) => {
  const srcFolder = `${process.cwd()}/src`;
  const targetFile = `${srcFolder}/validator/schemas/${fileName}.json`;
  
  return import(`${srcFolder}/utils/jsSchemas/${fileName}.js`)
    .then(({ default: jsSchema}) => {
      return fs.writeFile(targetFile, JSON.stringify(jsSchema, null, '\t'));
    })
    .catch(console.error);
});

console.log(process.cwd())

const fileName = getSchemaFileName();

convertSchema(fileName)
  .then(() => {
    console.log('ok');
  })
  .catch(console.error);

