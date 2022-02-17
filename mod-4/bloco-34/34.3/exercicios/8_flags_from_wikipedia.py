import requests
from parsel import Selector
from pathlib import Path
import re

response = requests.get('https://en.wikipedia.org/wiki/Gallery_of_sovereign_state_flags')

root_selector = Selector(text=response.text)

all_books = root_selector.css('.gallerybox').getall()

books = []

for book_container in all_books:
    book_selector = Selector(text=book_container)
    raw_name = book_selector.css('.gallerytext p').get()
    raw_url = book_selector.css('.image img::attr("src")').get()
    book = {
        "name": re.sub(r'<[^<]+?>|\n', '', raw_name),
        "url": f'https://{raw_url[2:]}',
    }
    books.append(book)

Path('./flags').mkdir(exist_ok=True)

for book in books:
    img_binary = requests.get(book['url'])
    with open(f'./flags/{book["name"]}.png', 'wb') as file:
        file.write(img_binary.content)
        print(f'Wrote {book["name"]}.png')
