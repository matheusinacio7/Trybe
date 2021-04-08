const divUm = document.getElementById('divUm');
const divDois = document.getElementById('divDois');
const divTres = document.getElementById('divTres');
const input = document.getElementById('input');
const myWebpage = document.getElementById('mySpotrybefy');
const mainHeader = document.getElementById('main-header');

function resetText(event) {
  event.target.innerText = 'Opção reiniciada';
}

divUm.addEventListener('dblclick', resetText);
divDois.addEventListener('dblclick', resetText);
divTres.addEventListener('dblclick', resetText);

divUm.dataset.order = 'primeira';
divDois.dataset.order = 'segunda';
divTres.dataset.order = 'terceira'

let selectedTech = divUm;

function selectTech(e) {
  if (e.target === selectedTech) {
    return;
  }

  selectedTech.classList.remove('tech');

  selectedTech = e.target;
  selectedTech.classList.add('tech');

  input.value = '';

  input.placeholder = `Alterar a ${e.target.dataset.order} tecnologia`;

  input.focus();
}

divUm.addEventListener('click', selectTech);
divDois.addEventListener('click', selectTech);
divTres.addEventListener('click', selectTech);

let previousValue = '';

function changeTechText(e) {
  const userInput = e.target.value;

  if (previousValue && !userInput) {
    selectedTech.innerText = `Aqui está a ${selectedTech.dataset.order} tecnologia que mais gostei.`;
  } else {
    selectedTech.innerText = e.target.value;
  }

  console.log(userInput);

  previousValue = userInput;
}

input.addEventListener('input', changeTechText);

function redirectToTrybeHome() {
  window.open('https://betrybe.com', '_blank');
}

myWebpage.addEventListener('dblclick', redirectToTrybeHome);

function togglePulsingGradient(e) {
  if (e.type === 'mouseover') {
    mainHeader.classList.add('pulsing-gradient');
  } else {
    mainHeader.classList.remove('pulsing-gradient');
  }
}

mainHeader.addEventListener('mouseover', togglePulsingGradient);
mainHeader.addEventListener('mouseleave', togglePulsingGradient);
