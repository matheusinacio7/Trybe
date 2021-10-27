import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

const CONNECTION_STRING = process.env.CONNECTION_STRING || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'cnaTestDb';

let db : Db;

const connect = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(CONNECTION_STRING)
      .then((connection) => {
        db = connection.db(DB_NAME);
        return db;
      }));

export default connect;
