import connection from './connection.js';
import validate from '../validator/validate.js';

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3 },
    author_id: { type: 'integer' },
  },
  required: ['title', 'author_id'],
  additionalProperties: false,
};

class Book {
  constructor(bookData) {
    validate(schema, bookData);

    const { title, author_id: authorId } = bookData;

    this.title = title;
    this.authorId = authorId;
  }

  save() {
    return new Promise((resolve, reject) => {
      connection.execute(
        `
          INSERT INTO trybe_model_example.books
            (title, author_id)
          VALUES
            (?, ?);
        `, [this.title, this.authorId]
      )
        .then(([rows]) => {
          resolve(rows);
        })
        .catch(reject);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection.execute(
        `
          SELECT
            b.title,
            CONCAT(a.first_name, ' ', a.middle_name, ' ', a.last_name) AS author
          FROM
            books AS b
          INNER JOIN
            authors AS a
            ON a.id = b.author_id
        `
      )
        .then(([rows]) => {
          resolve(rows);
        })
        .catch(reject);
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection.execute(
        `
          SELECT
            b.title,
            CONCAT(a.first_name, ' ', a.middle_name, ' ', a.last_name) AS author
          FROM
            books AS b
          INNER JOIN
            authors AS a
            ON a.id = b.author_id
          WHERE
            b.id = ?
        `, [id]
      )
        .then(([rows]) => {
          resolve(rows[0]);
        })
        .catch(reject);
    });
  }

  static getByAuthorId(authorId) {
    return new Promise((resolve, reject) => {
      connection.execute(
        `
          SELECT
            b.title,
            CONCAT(a.first_name, ' ', a.middle_name, ' ', a.last_name) AS author
          FROM
            books AS b
          INNER JOIN
            authors AS a
            ON a.id = b.author_id
          WHERE
            a.id = ?
        `, [authorId]
      )
        .then(([rows]) => {
          resolve(rows);
        })
        .catch(reject);
    });
  }
}

export default Book;
