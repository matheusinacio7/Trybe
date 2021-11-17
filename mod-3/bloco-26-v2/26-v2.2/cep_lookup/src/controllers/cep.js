import CEP from '../models/CEP.js';
import validate from '../validator/validate.js';
import HttpError from '../errors/HttpError.js';
import viacep from '../services/viacep.js';

const mapInternalToExternal = (details) => ({
  ...details,
  cep: details.cep.slice(0, 5) + '-' + details.cep.slice(5),
});

export const getDetailsByCep = (cep) => new Promise((resolve, reject) => {
  const parsedCep = cep.replace('-', '');
  CEP.getDetailsByCep(parsedCep)
    .then((details) => {
      if (!details) return viacep.getAddressByCep(cep);

      resolve(mapInternalToExternal(details));
    })
    .then((externalDetails) => {
      return CEP.insertNewAddress({
        cep: externalDetails.cep.replace('-', ''),
        logradouro: externalDetails.logradouro,
        bairro: externalDetails.bairro,
        localidade: externalDetails.localidade,
        uf: externalDetails.uf,
      });
    })
    .then((insertedDetails) => {
      resolve(mapInternalToExternal(insertedDetails));
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
