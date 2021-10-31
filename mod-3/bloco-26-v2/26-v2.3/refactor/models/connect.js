const { MongoClient } = require('mongodb');

let db = null;

const connect = () => db
  ? Promise.resolve(db)
  : MongoClient.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((connection) => {
      db = connection.db(process.env.DB_NAME);
      return db;
    });

module.exports = connect;