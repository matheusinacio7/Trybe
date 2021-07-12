const fetch = require('node-fetch');

function getRandomDogPicture() {
  return new Promise((resolve, reject) => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((json) => resolve(json.message))
    .catch((err) => reject(err));
  });
}

module.exports = {
  getRandomDogPicture,
}
