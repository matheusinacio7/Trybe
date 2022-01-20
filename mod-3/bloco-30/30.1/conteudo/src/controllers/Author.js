const Model = require('../models/Author');

const getAll = () => Model.getAll();

const getById = (id) => Model.findById(id);

const create = (newAuthorInput) => new Promise((resolve, reject) => {
  const { first_name, middle_name, last_name } = newAuthorInput;

  if (!Model.isValid(first_name, middle_name, last_name)) {
    return reject(new Error('Invalid data'));
  }

  resolve(Model.create(first_name, middle_name, last_name));
});

module.exports = {
  getAll,
  getById,
  create,
}
