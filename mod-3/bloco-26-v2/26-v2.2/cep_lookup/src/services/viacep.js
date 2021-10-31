import fetch from 'node-fetch';
const baseUrl = 'https://viacep.com.br/ws';

const getAddressByCep = (cep) => new Promise((resolve, reject) => {
  fetch(`${baseUrl}/${cep}/json`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default {
  getAddressByCep
};
