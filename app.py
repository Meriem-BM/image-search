import requests
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import re

app = Flask(__name__)

@app.route('/search')
def search():
    image_link = request.args.get('q')

    # Construct the search query URL with site:aliexpress.com
    query_url = f'https://www.google.com/search?q=site%3Aaliexpress.com%20{image_link}&tbm=isch&tbs=itp:photo'

    # Fetch the search results page
    response = requests.get(query_url, headers={'User-Agent': 'Mozilla/5.0'})
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract the search result links and thumbnail URLs
    search_results = []

    for div in soup.find_all('table', class_='IkMU6e'):
        link = div.find('a', href=True)
        img = div.find('img', src=True)
        title = div.find('span', class_='fYyStc')
        if link and img:
            search_results.append({
                'url': re.search(r'(?<=q=)(.*?)(?=&)', link['href']).group(1),
                'thumbnailUrl': img['src'],
                'title': title.text
            })

    return jsonify(search_results)

if __name__ == '__main__':
    app.run()