document.getElementById('header-container').style.backgroundColor = '#00B069';

function changeBackgroundColors(className, cardBackgroundColor, headerBackgroundColor) {
  let container = document.getElementsByClassName(className)[0];
  console.log(container);
  container.style.backgroundColor = cardBackgroundColor;

  let headers = container.querySelectorAll(`.${className} h3`);
  for (let header of headers) {
    header.style.backgroundColor = headerBackgroundColor;
  }
}

changeBackgroundColors('emergency-tasks', '#FF9F84', '#A500F3');
changeBackgroundColors('no-emergency-tasks', '#F9DB5E', '#232525');

document.getElementById('footer-container').style.backgroundColor = '#003533';