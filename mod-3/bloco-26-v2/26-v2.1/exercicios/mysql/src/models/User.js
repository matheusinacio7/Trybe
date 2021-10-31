import connection from './connection.js';
import InternalError from '../errors/InternalError.js';

const externalToInternalMap = {
  firstName: 'first_name',
  lastName: 'last_name',
  email: 'email',
};

const externalInfoMap = (user) => {
  if (!user) return user;

  const { id, first_name, last_name, email } = user;
  return { id, firstName: first_name, lastName: last_name, email };
};

const createNew = ({ firstName, lastName, email, password }) => new Promise((resolve, reject) => {
  connection.execute(
    `
      INSERT INTO users
        (first_name, last_name, email, password)
      VALUES
        (?, ?, ?, ?)
    `, [firstName, lastName, email, password]
  ).then(([{ insertedId }]) => {
      resolve({ id: insertedId, firstName, lastName, email });
    })
    .catch((err) => {
      const error = new InternalError('Error creating an user.');
      error.reason = err;
      reject(err);
    });
});

const getAll = () => new Promise((resolve, reject) => {
  connection.execute(
    `
      SELECT id, first_name, last_name, email FROM users
    `
  )
    .then((users) => {
      resolve(users[0].map(externalInfoMap));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to get all users.');
      error.reason = err;
      reject(err);
    });
});

const getById = (id) => new Promise((resolve, reject) => {
  connection.execute(
    `
      SELECT id, first_name, last_name, email FROM users WHERE id = ?
    `, [id]
  )
    .then(([rows]) => {
      resolve(externalInfoMap(rows[0]));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to get one user by Id.');
      error.reason = err;
      reject(err);
    })
});

const updateUser = (id, newData) => new Promise((resolve, reject) => {
  let executeString = 'UPDATE users SET ';
  const newValues = [];
  
  Object.entries(newData)
    .forEach(([key, value]) => {
      executeString += `${externalToInternalMap[key]} = ?, `;
      newValues.push(value);
    });

  executeString = executeString.slice(0, -2);
  executeString += ' WHERE id = ?';
  newValues.push(id);

  connection.execute(executeString, newValues)
    .then(([rows]) => {
      if (!rows.affectedRows) {
        resolve(null);
      } else {
        return getById(id);
      }
    })
    .then(resolve)
    .catch((err) => {
      const error = new InternalError('Error while trying to update user with id ' + id);
      error.reason = err;
      reject(err);
    });
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  connection.execute(
    `
      DELETE FROM users WHERE id = ? 
    `, [id]
  )
    .then(([{affectedRows}]) => {
      resolve({ deletedCount: affectedRows });
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to delete user with id ' + id);
      error.reason = err;
      reject(err);
    });
});

export default {
  createNew,
  getAll,
  getById,
  updateUser,
  deleteUser,
};
