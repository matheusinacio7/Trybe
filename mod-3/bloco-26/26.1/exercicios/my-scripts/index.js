const { questionInt } = require('readline-sync');

function getScript() {
  const script = questionInt(`\n
Qual script você quer executar? As opções são:
1. imc
2. velocidade
3. sorteio

`);
  switch(script) {
    case 1:
      require('./imc');
      break;
    case 2:
      require('./velocidade');
      break;
    case 3:
      require('./sorteio');
      break;
    default:
      console.log('\nNão sei qual script é esse... escolha uma das opções existentes!');
      getScript();
      break;
  }
}

function prompt() {
  console.log('\nOlá!');
  
  getScript();
}

prompt();
