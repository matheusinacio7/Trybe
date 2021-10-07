import connection from './connection.js';

const serialize = (authorRawData) => ({
  id: authorRawData.id,
  firstName: authorRawData.first_name,
  middleName: authorRawData.middle_name,
  lastName: authorRawData.last_name,
});

class Author {
  static getAll() {
    return new Promise((resolve, reject) => {
      connection.execute('SELECT id, first_name, middle_name, last_name FROM trybe_model_example.authors')
        .then((result) => {
          resolve(result[0].map(serialize));
        })
        .catch(reject);
    });
  }
}

export default Author;
