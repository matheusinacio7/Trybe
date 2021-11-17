import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';
import type { Db } from 'mongodb';

let db : Db;

let connection : MongoClient;

const connect = () => (db
  ? Promise.resolve(db)
  : new Promise(async (resolve) => {
      const server = await MongoMemoryServer.create();
      const URL = server.getUri();
      connection = await MongoClient.connect(URL);
      db = connection.db('mock_db');
      resolve(db);
    })
  );

export const disconnect = () => connection.close();

export default connect;
