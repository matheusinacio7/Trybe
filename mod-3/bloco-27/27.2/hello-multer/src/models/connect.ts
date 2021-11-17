import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

let db : Db;

const connect = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect((process.env.CONNECTION_STRING as string))
      .then((connection) => {
        db = connection.db((process.env.DB_NAME as string));
        return db;
      }));

export default connect;
