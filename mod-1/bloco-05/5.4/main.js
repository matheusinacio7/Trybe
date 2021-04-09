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

function changeFontColor(colorTag) {
  let fontColor;

  switch (colorTag) {
    case "black":
      fontColor = 'black';
      break;
    case "white":
      fontColor = 'white';
      break;
    case "green":
      fontColor = "#036B52";
      break;
  }

  document.body.style.color = fontColor;
}

function changeFontSize(sizeTag) {
  let fontSize = sizeTag;

  document.body.style.fontSize = fontSize;
}

function changeFontStyle(styleTag) {
  let fontStyle = styleTag;

  document.body.style.fontFamily = fontStyle;
}

function changeLineHeight(heightTag) {
  let lineHeight;

  switch(heightTag) {
    case "standard":
      lineHeight = '1.5';
      break;
    case "large":
      lineHeight = '2.0';
      break;
    case "small":
      lineHeight = '1.0';
      break;
  }

  document.querySelector('.main-content').style.lineHeight = lineHeight;
}

function handleSelect(e) {
  let selectedOption = e.target.selectedOptions[0];
  switch (e.target.id) {
    case "pref-bgColor":
      changeBgColors(selectedOption.value);
      break;
    case "pref-fontColor":
      changeFontColor(selectedOption.value);
      break;
    case "pref-fontSize":
      changeFontSize(selectedOption.value);
      break;
    case "pref-fontStyle":
      changeFontStyle(selectedOption.value);
      break;
    case "pref-lineHeight":
      changeLineHeight(selectedOption.value);
      break;
  }
}

const selectorElements = document.getElementById('pref-menu').getElementsByTagName('select');

for (let selector of selectorElements) {
  selector.addEventListener('change', handleSelect);
}