const Model = require('../models/Author');

const listAuthors = Model.getAll();

module.exports = {
  listAuthors
}
