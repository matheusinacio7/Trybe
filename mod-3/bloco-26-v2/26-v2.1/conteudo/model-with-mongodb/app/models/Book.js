import { ObjectId } from 'mongodb';
import ValidationError from '../validator/ValidationError.js';
import connection from './connection.js';
import validate from '../validator/validate.js';

const schema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 3 },
    author_id: { type: 'integer' },
  },
  required: ['title', 'author_id'],
  additionalProperties: false,
};

const projectAuthorPipeline = [
  {
    $lookup: {
      from: 'authors',
      localField: 'author_id',
      foreignField: '_id',
      as: 'authors'
    },
  },
  {
    $project: {
      title: 1,
      author: { $first: '$authors' }
    }
  },
];

const projectAuthorFullName = {
  $project: {
    title: 1,
    author: { $concat: ['$author.firstName', ' ', '$author.middleName', ' ','$author.lastName'] }
  }
};

class Book {
  constructor(bookData) {
    validate(schema, bookData);

    const { title, author_id: authorId } = bookData;

    this.title = title;
    this.authorId = parseInt(authorId, 10);
  }

  save() {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return Promise.all([
            db.collection('authors').findOne({ _id: this.authorId }),
            Promise.resolve(db),
          ]);
        })
        .then(([author, db]) => {
          if (!author) throw new ValidationError('dados invalidos');

          return db.collection('books').insertOne({
            title: this.title,
            author_id: this.authorId,
          });
        })
        .then((result) => {
          resolve(result);
        })
        .catch(reject);
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return db.collection('books').aggregate([...projectAuthorPipeline, projectAuthorFullName]).toArray()
        })
        .then((books) => {
          resolve(books);
        })
        .catch(reject);
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return db.collection('books').findOne(new ObjectId(id));
        })
        .then((book) => {
          resolve(book);
        })
        .catch(reject);
    });
  }

  static getByAuthorId(authorId) {
    return new Promise((resolve, reject) => {
      connection()
        .then((db) => {
          return db.collection('books').aggregate([
            {
              $match: {
                author_id: parseInt(authorId, 10),
              }
            },
            ...projectAuthorPipeline,
            projectAuthorFullName,
          ]).toArray();
        })
        .then((books) => {
          resolve(books);
        })
        .catch(reject);
    });
  }
}

export default Book;
