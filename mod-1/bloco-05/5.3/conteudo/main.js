const divUm = document.getElementById('divUm');
const divDois = document.getElementById('divDois');
const divTres = document.getElementById('divTres');
const input = document.getElementById('input');
const myWebpage = document.getElementById('mySpotrybefy');

/*
 Copie esse arquivo e edite apenas ele;
 Crie uma função que adicione a classe 'tech' ao elemento selecionado;
1. Deve existir apenas um elemento com a classe 'tech'. Como você faz isso?
 Crie uma função que, ao digitar na caixa de texto, altere o texto do elemento
com a classe 'tech';
 Crie uma função que, ao clicar duas vezes em 'Meu top 3 do Spotrybefy', ele
redirecione para alguma página;
1. Que tal redirecionar para seu portifólio?
 Crie uma função que, ao passar o mouse sobre 'Meu top 3 do Spotrybefy', altere
a cor do mesmo;

Segue abaixo um exemplo do uso de event.target:
*/

function resetText(event) {
  event.target.innerText = 'Opção reiniciada';
}

divUm.addEventListener('dblclick', resetText);
divDois.addEventListener('dblclick', resetText);
divTres.addEventListener('dblclick', resetText);

let selectedTech = divUm;

function selectTech(e) {
  if (e.target === selectedTech) {
    return;
  }

  selectedTech.classList.remove('tech');
  e.target.classList.add('tech');
  selectedTech = e.target;

  input.value = '';

  switch (e.target.id) {
    case 'divUm':
      input.placeholder = 'Alterar a primeira tecnologia';
      break;
    case 'divDois':
      input.placeholder = 'Alterar a segunda tecnologia';
      break;
    case 'divTres':
      input.placeholder = 'Alterar a terceira tecnologia';
      break;
  }

  input.focus();
}

divUm.addEventListener('click', selectTech);
divDois.addEventListener('click', selectTech);
divTres.addEventListener('click', selectTech);

function changeTechText(e) {
  selectedTech.innerText = e.target.value;
}

input.addEventListener('input', changeTechText);

function redirectToTrybeHome() {
  window.open('https://betrybe.com', '_blank');
}

myWebpage.addEventListener('dblclick', redirectToTrybeHome);
