require('dotenv').config();
const { MongoClient } = require('mongodb');

(async () => {
  const client = await MongoClient.connect(process.env.CONNECTION_STRING)
  const db = client.db(process.env.DB_NAME);
  const userCollection = db.collection('users');
  await userCollection.createIndexes([{ key: { username: 1 } , unique: true }, { key: { email: 1 }, unique: true }]);

  await client.close();
})();
