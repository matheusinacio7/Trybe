import CEP from '../models/CEP.js';
import validate from '../validator/validate.js';
import HttpError from '../errors/HttpError.js';

const mapInternalToExternal = (details) => ({
  ...details,
  cep: details.cep.slice(0, 5) + '-' + details.cep.slice(5),
});

export const getDetailsByCep = (cep) => new Promise((resolve, reject) => {
  const parsedCep = cep.replace('-', '');
  CEP.getDetailsByCep(parsedCep)
    .then((details) => {
      if (details !== null) {        
        resolve(mapInternalToExternal(details));
      } else {
        resolve(details);
      }
    })
    .catch(reject);
});

export const insertAddress = (details) => new Promise((resolve, reject) => {
  validate('insert_address', details)
    .then(() => {
      return CEP.insertNewAddress(details);
    })
    .then((insertedDetails) => {
      resolve(mapInternalToExternal(insertedDetails));
    })
    .catch((err) => {
      if (err.message === 'Duplicated data') {
        reject(new HttpError({ message: 'CEP já cadastrado no banco', status: 409 }));
      } else {
        reject(err);
      }
    });
});
