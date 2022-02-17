import requests
from re import sub, search
from parsel import Selector

BASE_URL = 'http://books.toscrape.com'


url = f'{BASE_URL}/catalogue/the-grand-design_405/index.html'
response = requests.get(url)
selector = Selector(text=response.text)

title = selector.css('.product_page .product_main h1::text').get()
price = selector.css('.product_page .price_color::text').re_first(r"\d+\.\d{2}")
description_dirty = selector.css('.product_page #product_description + p::text').get()
description = sub(r'\s*\.\.\.more$', '', description_dirty)
cover_url_relative = selector.css(f'.product_page img[alt="{title}"]::attr(src) ').get()
cover_url = sub(r'(\.\.*\/)+', BASE_URL + '/',cover_url_relative)
stock_description = selector.css('.product_page .product_main .instock.availability::text').getall()[1].strip()
stock_count = search(r'[\d](?=[\s|(available)])', stock_description).group(0)

row = ','.join([title, price, description, cover_url, stock_count])
print(row)
