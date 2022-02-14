import pymongo
import sys
from pprint import pprint

client = pymongo.MongoClient()
db = client.trybe_mod_4
collection = db.books

category = sys.argv[1]
books = collection.find({ "categories": { "$in": [category] }  })

for book in books:
    pprint(book)

client.close()
