// apiScript.js
const API_URL = 'https://icanhazdadjoke.com/';


async function fetchJoke() {
  try {
    const joke = await fetch(API_URL, {headers: {'Accept': 'text/plain'}});
    const jokeString = await joke.text();
    this.jokeContainerElement.innerText = jokeString
  } catch(err) {
    alert(`Ih... deu ruim: ${err}`);
  }
};

window.onload = async () => {
  this.jokeContainerElement = document.getElementById('jokeContainer');
  await fetchJoke();
};