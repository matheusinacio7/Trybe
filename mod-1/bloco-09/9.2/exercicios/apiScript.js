// apiScript.js
const API_URL = 'https://icanhazdadjoke.com/';


function fetchJoke() {
  fetch(API_URL, {headers: {'Accept': 'text/plain'}})
  .then((response) => response.text())
  .then((jokeString) => this.jokeContainerElement.innerText = jokeString)
  .catch((err) => alert(`Ih... deu ruim: ${err}`))
};

window.onload = () => {
  this.jokeContainerElement = document.getElementById('jokeContainer');
  fetchJoke();
};