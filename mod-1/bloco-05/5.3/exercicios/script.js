function createDaysOfTheWeek() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const day = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = day;

    weekDaysList.appendChild(dayListItem);
  };
};

createDaysOfTheWeek();

function isFriday(day) {
  switch(day) {
    case 4:
      return true;
    case 11:
      return true;
    case 18:
      return true;
    case 25:
      return true;
    default:
      return false;
  }
}

function isHoliday(day) {
  switch(day) {
    case 24:
      return true;
    case 25:
      return true;
    case 31:
      return true;
    default:
      return false;
  }
}

function populateDaysOfTheMonth() {
  const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  const monthDaysContainer = document.getElementById('days');

  for (let day of dezDaysList) {
    const dayListItem = document.createElement('li');
    dayListItem.classList.add('day');
    dayListItem.innerText = day;

    if(isFriday(day)) {
      dayListItem.classList.add('friday');
    }

    if(isHoliday(day)) {
      dayListItem.classList.add('holiday');
    }

    monthDaysContainer.appendChild(dayListItem);
  }
}

populateDaysOfTheMonth();

function generateHolidayButton(innerText) {
  const buttonsContainer = document.querySelector('.buttons-container');

  buttonsContainer.insertAdjacentHTML('beforeend',
  `<button id="btn-holiday">${innerText}</button>`
  );
}

generateHolidayButton('Feriados');

let areHolidaysHighlighted = false;

function handleToggleHolidaysHighlight() {
  const holidays = document.getElementsByClassName('holiday');
  let newColor;

  if (areHolidaysHighlighted) {
    newColor = 'rgb(238, 238, 238)';
  } else {
    newColor = 'rgb(200, 238, 215)';
  }

  for (let holiday of holidays) {
    holiday.style.backgroundColor = newColor;
  }

  areHolidaysHighlighted = !areHolidaysHighlighted;
}

function addHolidayHighlightListener() {
  const holidayButton = document.getElementById('btn-holiday');

  holidayButton.addEventListener('click', handleToggleHolidaysHighlight);
}

addHolidayHighlightListener();

function generateFridayButton(innerText) {
  const buttonsContainer = document.querySelector('.buttons-container');

  buttonsContainer.insertAdjacentHTML('beforeend', 
  `<button id="btn-friday">${innerText}</button>`
  );
}

generateFridayButton('Sexta-feira');
