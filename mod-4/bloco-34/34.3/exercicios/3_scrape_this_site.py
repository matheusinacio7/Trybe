import requests


url = 'https://scrapethissite.com/pages/advanced/?gotcha=headers'
headers = {
    'User-Agent': 'Mozilla/5.0\
    (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0',

    'Accept': 'text/html,application\
    /xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
}
response = requests.get(url, headers=headers)

print(response.text)
