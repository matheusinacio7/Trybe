const Model = require('../models/Author');

const getAll = () => Model.getAll();

const getById = (id) => Model.findById(id);

module.exports = {
  getAll,
  getById,
}
