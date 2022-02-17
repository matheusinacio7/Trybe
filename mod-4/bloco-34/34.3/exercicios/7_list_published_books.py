import pymongo


client = pymongo.MongoClient()
db = client.trybe_mod_4
collection = db.books

category_count = collection.aggregate([
  {
    '$match': { 'status': 'PUBLISH' }
  },
  {
    '$unwind': '$categories'
  },
  {
    '$group': { '_id': '$categories', 'count': { '$sum': 1 } }
  },
  {
    '$sort': { 'count': -1 }
  },
])

for category in category_count:
    print(category['_id'] + ' ' + str(category['count']))

client.close()
