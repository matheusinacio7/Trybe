import CEP from '../models/CEP.js';

export const getDetailsByCep = (cep) => new Promise((resolve, _reject) => {
  const parsedCep = cep.replace('-', '');
  CEP.getDetailsByCep(parsedCep)
    .then((details) => {
      resolve(details)
    });
});
