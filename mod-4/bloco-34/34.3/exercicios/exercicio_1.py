import requests

response = requests.get('https://httpbin.org/encoding/utf8')

print(response.text)
