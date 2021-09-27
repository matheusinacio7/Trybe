const fs = require('fs/promises');
const { questionInt, question } = require('readline-sync');

console.log('\nLeitor de arquivos 101');

console.log('\nO que você deseja fazer?')
console.log(`
1. Ler o conteúdo de um arquivo
2. Substituir uma palavra por outra
`);

const selectedProgram = questionInt('');

async function getFileName() {
  console.log('\nOs arquivos disponiveis na pasta exercicios são:\n');
  await fs.readdir('.')
    .then((fileList) => fileList.map((name) => `* ${name}`).join('\n'))
    .then(console.log)
    .catch(console.error);
  const fileName = question('\nQual deseja ler?  ');
  return fileName;
}

const getFileContent = (fileName) => new Promise((resolve, reject) => {
  return fs.readFile(`./${fileName}`, 'utf-8')
    .then(resolve)
    .catch(() => {
      console.error('Arquivo inexistente');
    });
}) ;

async function programReadFromFile() {
  console.log('\nLeitor de arquivos');
  const fileName = await getFileName();
  getFileContent(fileName).then(console.log);
}

async function programSubstituteWords() {
  console.log('\nSubstituidor de palavras');
  const fileName = await getFileName();
  const wordToBeSubstituted = question('\nQual palavra você quer substituir?  ');
  const wordToSubstitute = question('\nQual palavra colocar no lugar?  ');
  const fileContent = await getFileContent(fileName);
  const newFileContent = fileContent.replace(new RegExp(wordToBeSubstituted, 'ig'), wordToSubstitute);
  console.log('\nO novo conteúdo será:');
  console.log(newFileContent);
  const newFileName = question('\nQual o nome do arquivo que deseja salvar o novo conteudo?  ');
  fs.writeFile(`./${newFileName}`, newFileContent).then().catch(console.error);
}

const programs = { 
  1: programReadFromFile,
  2: programSubstituteWords,
};

programs[selectedProgram] ? programs[selectedProgram]() : console.log('Este programa não existe');

