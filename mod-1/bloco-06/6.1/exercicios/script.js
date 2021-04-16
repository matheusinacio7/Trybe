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
  { name: 'Pará', acronym: 'PA',},
  { name: 'Paraíba ', acronym: 'PB',},
  { name: 'Paraná', acronym: 'PR',},
  { name: 'Pernambuco', acronym: 'PE',},
  { name: 'Piauí', acronym: 'PI',},
  { name: 'Rio de Janeiro', acronym: 'RJ',},
  { name: 'Rio Grande do Norte', acronym: 'RN',},
  { name: 'Rio Grande do Sul ', acronym: 'RS',},
  { name: 'Rondônia', acronym: 'RO',},
  { name: 'Roraima', acronym: 'RR',},
  { name: 'Santa Catarina ', acronym: 'SC',},
  { name: 'São Paulo ', acronym: 'SP',},
  { name: 'Sergipe', acronym: 'SE',},
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

  if (!validateDate(answer["start-date"])) {
    return;
  }

  for (let property in answer) {
    const newInfo = document.createElement('p');
    newInfo.innerText = `${property}: ${answer[property]}`;

    resultsElement.appendChild(newInfo);
  }
}

function validateDate(dateString) {
  const splitDate = dateString.split('/');
  const [ day, month, year ] = splitDate;

  if (!splitDate || splitDate.length !== 3
    || day.length !== 2 || month.length !== 2 || year.length !== 4
    ) {
    alert('A data precisa estar no formato dd/mm/aaaa');
    return false;
  }

  const dayNumber = parseInt(day, 10);
  if (dayNumber < 1 || dayNumber > 31) {
    alert('O dia deve estar entre 1 e 31');
    return false;
  }

  const monthNumber = parseInt(month, 10);
  if (monthNumber < 1 || monthNumber > 12) {
    alert('O mês precisa estar entre 1 e 12');
    return false;
  }

  const yearNumber = parseInt(year, 10);
  if (yearNumber < 0) {
    alert('O ano não pode ser negativo');
    return false;
  }

  return true;
}

function clearResults(e) {
  // default é limpar o formulário. Eu não quero previnir este comportamento
  const infoCount = resultsElement.children.length;

  for (let i = 0; i < infoCount; i += 1) {
    resultsElement.lastChild.remove();
  }
}

formElement.addEventListener('submit', generateDisplayedResults);
formElement.addEventListener('reset', clearResults);
  