const flexContainer = document.getElementById('flex-box');

function adjustUnitsVisibilityAndGap(direction) {
  if (direction === 'row') {
    flexContainer.classList.remove('flex-box-column');
    flexContainer.classList.add('flex-box-row');
  } else {
    flexContainer.classList.add('flex-box-column');
    flexContainer.classList.remove('flex-box-row');
  }
}

const currentFlexDirection = getComputedStyle(flexContainer).flexDirection;

adjustUnitsVisibilityAndGap(currentFlexDirection);
