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
  let prefValue = selectedOption.value;
  switch (e.target.id) {
    case "pref-bgColor":
      changeBgColors(prefValue);
      break;
    case "pref-fontColor":
      changeFontColor(prefValue);
      break;
    case "pref-fontSize":
      changeFontSize(prefValue);
      break;
    case "pref-fontStyle":
      changeFontStyle(prefValue);
      break;
    case "pref-lineHeight":
      changeLineHeight(prefValue);
      break;
  }

  let prefName = e.target.id.replace('pref-', '');
  savePreference(prefName, prefValue);
}

const selectorElements = document.getElementById('pref-menu').getElementsByTagName('select');

for (let selector of selectorElements) {
  selector.addEventListener('change', handleSelect);
}

function loadPreferences() {
  const defaultPreferences = {
    bgColor: 'white',
    fontColor: 'black',
    fontSize: 'medium',
    lineHeight: 'standard',
    fontStyle: 'serif',
  };

  if (!Storage) {
    return defaultPreferences;
  }

  if (!localStorage.preferences) {
    return defaultPreferences;
  }

  let loaded = JSON.parse(localStorage.preferences);
  let preferences = { ... defaultPreferences }

  if (loaded.bgColor) {
    preferences.bgColor = loaded.bgColor;
  }

  if (loaded.fontColor) {
    preferences.fontColor = loaded.fontColor;
  }

  if (loaded.fontSize) {
    preferences.fontSize = loaded.fontSize;
  }

  if (loaded.lineHeight) {
    preferences.lineHeight = loaded.lineHeight;
  }

  if (loaded.fontStyle) {
    preferences.fontStyle = loaded.fontStyle;
  }

  return preferences;
}

function applyPreferences(preferences) {
  changeBgColors(preferences.bgColor);
  changeFontColor(preferences.fontColor);
  changeFontSize(preferences.fontSize);
  changeFontStyle(preferences.fontStyle);
  changeLineHeight(preferences.lineHeight);
}

function savePreference(preference, value) {
  let preferences = loadPreferences();
  preferences[preference] = value;

  let preferenceString = JSON.stringify(preferences);
  localStorage.preferences = preferenceString;
}

window.onload = function() {
  let preferences = loadPreferences();
  applyPreferences(preferences);
  console.log(preferences);
}