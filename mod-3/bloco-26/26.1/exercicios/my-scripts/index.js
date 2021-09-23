const { questionInt } = require('readline-sync');

function getScript() {
  const script = questionInt(`\n
Qual script você quer executar? As opções são:
1. imc
2. velocidade
3. sorteio
4. fatorial
5. fibonacci

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
    case 4:
      require('./fatorial');
      break;
    case 5:
      require('./fibonacci');
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
