const { ObjectId } = require('mongodb');
const connect = require('./connect');

const add = async (name, brand) => {
  try {
    const result = await connect().then((db) => {
      return db.collection('products').insertOne({ name, brand });
    });

    return { id: result.insertId, name, brand };
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getAll = async () => {
  try {
    const result = await connect().then((db) => db.collection('products').find().toArray());
    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const [result] = await connect().then((db) => db.collection('products').find(new ObjectId(id)).toArray());
    if (!result) return null
    return result;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const update = async (id, name, brand) => {
  try {
    await connect().then((db) => db.collection('products').updateOne({_id: new ObjectId(id)}, { $set: { name, brand } }));
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const exclude = async (id) => {
  try {
    const product = await getById(id);
    if (!product) return {};
    await connect().then((db) => db.collection('products').deleteOne({_id: new ObjectId(id)}));
    return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { add, getAll, getById, update, exclude };