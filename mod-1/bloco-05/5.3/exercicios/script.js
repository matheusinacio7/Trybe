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
      dayListItem.dataset.day = day;
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

let hasSextou = false;

function handleToggleSEXTOU(e) {
  const fridays = document.getElementsByClassName('friday');

  for (let friday of fridays) {
    if (hasSextou) {
      friday.innerText = friday.dataset.day;
    } else {
      friday.innerText = 'SEXTOU';
    }
  }

  hasSextou = !hasSextou;
}

function addSEXTOUEventListener() {
  const fridayButton = document.getElementById('btn-friday');

  fridayButton.addEventListener('click', handleToggleSEXTOU);
}

addSEXTOUEventListener();

function handleToggleZoom(e) {
  if (e.type === 'mouseover') {
    e.target.style.transform = 'scale(1.5)';
  } else if (e.type === 'mouseleave') {
    e.target.style.transform = 'scale(1.0)';
  }
}

function addZoomListener() {
  const days = document.getElementsByClassName('day');

  for (let day of days) {
    day.addEventListener('mouseover', handleToggleZoom);
    day.addEventListener('mouseleave', handleToggleZoom);
  }
}

addZoomListener();

function addTask(task) {
  const tasksContainer = document.querySelector('.my-tasks');

  tasksContainer.insertAdjacentHTML('beforeend', 
  `<span>${task}</span>`
  );
}

addTask('Comer ceia');
addTask('Dormir');

function addTaskLabel(color) {
  const tasksContainer = document.querySelector('.my-tasks');

  const labelElement = document.createElement('div');
  labelElement.className = 'task';
  labelElement.style.backgroundColor = color;

  tasksContainer.appendChild(labelElement);
}

addTaskLabel('#006f9d');
addTaskLabel('#008000');

let selectedTask;

function handleToggleTask(e) {
  const classList = e.target.classList;

  if (classList.contains('task--selected')) {
    selectedTask = undefined;
    classList.remove('task--selected');
  } else {
    if(selectedTask) {
      selectedTask.classList.remove('task--selected');
    }
    classList.add('task--selected');
    selectedTask = e.target;
  }
}

// Aqui eu coloquei um estilo para manter o tamanho maior
function addToggleTaskListener() {
  const taskLabels = document.getElementsByClassName('task');

  for (let task of taskLabels) {
    task.addEventListener('click', handleToggleTask);
  }
}

addToggleTaskListener();

function handleAssignTask(e) {
  if (!selectedTask) {
    return;
  }

  if (e.target.style.color === selectedTask.style.backgroundColor) {
    e.target.style.color = 'rgb(119, 119, 119)';
  } else {
    e.target.style.color = selectedTask.style.backgroundColor;
  }
}

function addAssignTaskListener() {
  const days = document.getElementsByClassName('day');

  for (let day of days) {
    day.addEventListener('click', handleAssignTask);
  }
}

addAssignTaskListener();

function handleAddTask() {
  const inputField = document.getElementById('task-input');

  if (!inputField.value) {
    return alert('Por favor, insira um compromisso!');
  }

  const taskListElement = document.querySelector('.task-list');

  const taskElement = document.createElement('li');
  taskElement.innerText = inputField.value;

  taskListElement.appendChild(taskElement);

  inputField.value = '';

  inputField.focus();
}

function addAddTaskListeners() {
  const inputField = document.getElementById('task-input');

  inputField.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
      handleAddTask();
    }
  });

  const addButton = document.getElementById('btn-add');

  addButton.addEventListener('click', handleAddTask);
}

addAddTaskListeners();
