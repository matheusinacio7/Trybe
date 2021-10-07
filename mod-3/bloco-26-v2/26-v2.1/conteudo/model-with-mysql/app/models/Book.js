import connection from './connection.js';

const serialize = ({ author_id, ...bookRawData}) => ({
  ...bookRawData,
  authorId: author_id,
});

class Book {
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
            a.id = ${authorId}
        `
      )
        .then(([rows]) => {
          resolve(rows);
        })
        .catch(reject);
    });
  }
}

export default Book;
