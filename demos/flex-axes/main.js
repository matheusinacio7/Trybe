const flexContainer = document.getElementById('flex-box');
let previousFlexDirection;

const horizontalAxisLabel = document.querySelector('#horizontal-axis .axis-label');
const verticalAxisLabel = document.querySelector('#vertical-axis .axis-label');

function handleDirectionChange(direction) {
  if (direction === 'row') {
    flexContainer.classList.remove('flex-box-column');
    flexContainer.classList.add('flex-box-row');
    horizontalAxisLabel.innerText = 'Eixo Principal';
    verticalAxisLabel.innerText = 'Eixo Cruzado';
  } else {
    flexContainer.classList.add('flex-box-column');
    flexContainer.classList.remove('flex-box-row');
    horizontalAxisLabel.innerText = 'Eixo Cruzado';
    verticalAxisLabel.innerText = 'Eixo Principal';
  }
}

function checkForChanges() {
  const currentStyles = getComputedStyle(flexContainer);
  const currentFlexDirection = currentStyles.flexDirection;
  const currentAlignContent = currentStyles.alignContent;

  if (currentAlignContent === 'stretch') {
    flexContainer.classList.remove('flex-box-not-stretched');   
  } else {
    flexContainer.classList.add('flex-box-not-stretched');
  }

  if (previousFlexDirection !== currentFlexDirection) {
    handleDirectionChange(currentFlexDirection);
    previousFlexDirection = currentFlexDirection;
  }

}

setInterval(() => {
  checkForChanges();
}, 1000);

const axes = document.getElementById('axes');

function toggleAxes() {
  axes.classList.toggle('axes--hidden');
}

document.getElementById('hide-axes').addEventListener('click', toggleAxes);
