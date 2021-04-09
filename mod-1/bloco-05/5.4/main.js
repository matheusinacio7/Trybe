const bgElements = {
  main: document.querySelectorAll('.main-content'),
  secondary: document.querySelectorAll('.hero-header, body')
};

function changeBgColors(colorTag) {
  let mainBgColor;
  let secondaryBgColor;

  switch (colorTag) {
    case "white":
      mainBgColor = 'white';
      secondaryBgColor = '#e9e9e9';
      break;
    case "black":
      mainBgColor = '#121212';
      secondaryBgColor = 'black';
      break;
    case "parchment":
      mainBgColor = "#FFF5E2";
      secondaryBgColor = "#E6DFD4";
      break;
  }

  for (let el of bgElements.main) {
    el.style.backgroundColor = mainBgColor;
  }

  for (let el of bgElements.secondary) {
    el.style.backgroundColor = secondaryBgColor;
  }

}

function handleSelect(e) {
  let selectedOption = e.target.selectedOptions[0];

  switch (e.target.id) {
    case "pref-bgColor":
      changeBgColors(selectedOption.value);
      break;
  }
}

const selectorElements = document.getElementById('pref-menu').getElementsByTagName('select');

for (let selector of selectorElements) {
  selector.addEventListener('change', handleSelect);
}