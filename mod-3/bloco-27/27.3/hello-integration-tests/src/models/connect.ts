import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

let db : Db;

let connection : MongoClient;

const connect = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect((process.env.CONNECTION_STRING as string))
      .then((newConnection) => {
        connection = newConnection;
        db = connection.db((process.env.DB_NAME as string));
        return db;
      }));

export const disconnect = () => connection.close();

export default connect;
