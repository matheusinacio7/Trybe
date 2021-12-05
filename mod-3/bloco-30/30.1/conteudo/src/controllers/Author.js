const Model = require('../models/Author');

const getAll = () => Model.getAll();

const getById = (id) => Model.findById(id);

const create = (newAuthorInput) => {
  const { first_name, middle_name, last_name } = newAuthorInput;

  if (!Model.isValid(first_name, middle_name, last_name)) {
    throw new Error('Invalid data');
  }

  return Model.create(first_name, middle_name, last_name);
};

module.exports = {
  getAll,
  getById,
}
