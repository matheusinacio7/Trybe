
import connection from './connection.js';
import validate from '../validator/validate.js';

const serialize = (authorRawData) => authorRawData ? ({
  id: authorRawData.id,
  firstName: authorRawData.first_name,
  middleName: authorRawData.middle_name,
  lastName: authorRawData.last_name,
}) : {};

const schema = {
  type: 'object',
  properties: {
    first_name: { type: 'string' },
    middle_name: { type: 'string' },
    last_name: { type: 'string' },
  },
  required: ['first_name', 'last_name'],
  additionalProperties: false,
};

class Author {
  constructor(authorData) {
    try {
      validate(schema, authorData);
    } catch (err) {
      throw err;
    }

    const { first_name: firstName, middle_name: middleName = null, last_name: lastName } = authorData;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
  }

  save() {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return db.collection('authors').insertOne({
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
          });
        })
        .then((result) => {
          resolve(result);
        })
        .catch(reject);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return db.collection('authors').find().toArray()
        })
        .then((authors) => {
          resolve(authors.map(({ _id, ...props }) => ({ id: _id, ...props })));
        })
        .catch(reject);
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return db.collection('authors').findOne({ _id: parseInt(id, 10) });
        })
        .then((author) => {
          console.log(author);
          resolve(author);
        })
        .catch(reject);
    });
  }
}

export default Author;
