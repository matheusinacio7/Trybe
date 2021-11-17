import { MongoClient } from 'mongodb';

let db = null;

const connection = () => db
  ? Promise.resolve(db)
  : MongoClient.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
      .then((mongoConnection) => {
        db = mongoConnection.db('trybe');
        return db;
      });

export default connection;
