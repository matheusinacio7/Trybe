import connect from './connect.js';
import InternalError from '../errors/InternalError.js';

const externalInfoMap = (user) => {
  if (!user) return user;

  const { password, _id, ...rest } = user;
  return { id: _id, ...rest };
};

const createNew = ({ firstName, lastName, email, password }) => new Promise((resolve, reject) => {
  connect.execute(
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
  connect()
    .then((db) => {
      return db.collection('users').find().toArray();
    })
    .then((users) => {
      resolve(users.map(externalInfoMap));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to get all users.');
      error.reason = err;
      reject(err);
    });
});

const getById = (id) => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('users').findOne(new ObjectId(id));
    })
    .then((user) => {
      resolve(externalInfoMap(user));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to get one user by Id.');
      error.reason = err;
      reject(err);
    })
});

const updateUser = (id, newData) => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('users').findOneAndUpdate({ _id: new ObjectId(id) }, { $set: newData }, { returnDocument: 'after' });
    })
    .then(({ value }) => {
      resolve(externalInfoMap(value));
    })
    .catch((err) => {
      const error = new InternalError('Error while trying to update user with id ' + id);
      error.reason = err;
      reject(err);
    });
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  connect()
    .then((db) => {
      return db.collection('users').deleteOne({ _id: new ObjectId(id) });
    })
    .then((result) => {
      resolve(result);
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
