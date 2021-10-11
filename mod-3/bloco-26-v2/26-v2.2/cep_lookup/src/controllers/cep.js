import CEP from '../models/CEP.js';

export const getDetailsByCep = (cep) => new Promise((resolve, _reject) => {
  const parsedCep = cep.replace('-', '');
  CEP.getDetailsByCep(parsedCep)
    .then((details) => {
      if (details !== null) {        
        resolve({
            ...details,
            cep: details.cep.slice(0, 5) + '-' + details.cep.slice(5),
        });
      } else {
        resolve(details)
      }
    });
});
