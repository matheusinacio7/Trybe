from email.mime import base
import requests
import json

base_url = 'http://quotes.toscrape.com/api/quotes?page='
quotes = []

page = 1
has_next = True

while has_next:
    response = requests.get(base_url + str(page)).json()
    quotes.extend(response["quotes"])
    has_next = response["has_next"]
    page += 1

with open('./quotes.json', 'w') as file:
    file.write(json.dumps(quotes, indent=4))
