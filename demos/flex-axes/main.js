const flexContainer = document.getElementById('flex-box');
let previousFlexDirection;

function adjustUnitsVisibilityAndGap(direction) {
  if (direction === 'row') {
    flexContainer.classList.remove('flex-box-column');
    flexContainer.classList.add('flex-box-row');
  } else {
    flexContainer.classList.add('flex-box-column');
    flexContainer.classList.remove('flex-box-row');
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
    adjustUnitsVisibilityAndGap(currentFlexDirection);
    previousFlexDirection = currentFlexDirection;
  }

}

setInterval(() => {
  checkForChanges();
}, 1000);
