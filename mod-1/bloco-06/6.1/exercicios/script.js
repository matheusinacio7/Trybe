const formElement = document.getElementById('resume');
const resultsElement = document.getElementById('results');

const brazilianStates = [
  { name: 'Acre', acronym: 'AC',},
  { name: 'Alagoas', acronym: 'AL',},
  { name: 'Amapá', acronym: 'AP',},
  { name: 'Amazonas', acronym: 'AM',},
  { name: 'Bahia', acronym: 'BA',},
  { name: 'Ceará', acronym: 'CE',},
  { name: 'Distrito Federal', acronym: 'DF',},
  { name: 'Espírito Santo', acronym: 'ES',},
  { name: 'Goiás', acronym: 'GO',},
  { name: 'Maranhão', acronym: 'MA',},
  { name: 'Mato Grosso', acronym: 'MT',},
  { name: 'Mato Grosso do Sul', acronym: 'MS',},
  { name: 'Minas Gerais', acronym: 'MG',},
  { name: 'Paraná', acronym: 'PA',},
  { name: 'Paraíba', acronym: 'PB',},
  { name: 'Pará', acronym: 'PR',},
  { name: 'Pernambuco', acronym: 'PE',},
  { name: 'Piauí', acronym: 'PI',},
  { name: 'Rio de Janeiro', acronym: 'RJ',},
  { name: 'Rio Grande do Norte', acronym: 'RN',},
  { name: 'Rio Grande do Sul', acronym: 'RS',},
  { name: 'Rondonia', acronym: 'RO',},
  { name: 'Roraima', acronym: 'RR',},
  { name: 'Santa Catarina', acronym: 'SC',},
  { name: 'Sergipe', acronym: 'SP',},
  { name: 'São Paulo', acronym: 'SE',},
  { name: 'Tocantins', acronym: 'TO',},  
];

function fillStateOptions() {
  const selectElement = document.getElementById('pi-state');

  for (let state of brazilianStates) {
    const optionHTML = 
    `<option value="${state.acronym}">${state.name}</option>`
    ;

    selectElement.insertAdjacentHTML('beforeend', optionHTML);
  }
}

fillStateOptions();

function getFormAnswer(formElement) {
  const formData = new FormData(formElement);
  const answer = {};

  for (let pair of formData.entries()) {
    answer[pair[0]] = pair[1];
  }
  return answer;
}

function generateDisplayedResults(e) {
  e.preventDefault();
  const answer = getFormAnswer(e.target);

  for (let property in answer) {
    const newInfo = document.createElement('p');
    newInfo.innerText = `${property}: ${answer[property]}`;

    resultsElement.appendChild(newInfo);
  }
}

formElement.addEventListener('submit', generateDisplayedResults);
  