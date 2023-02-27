const express = require('express');
const request = require('request-promise');
const cheerio = require('cheerio');
const url = require('url');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors())

const PORT = 5000;

app.get('/search', async (req, res) => {
    const imageLink = req.query.q;
    console.log(`Searching AliExpress for products similar to ${imageLink}`);
  
    // Construct the search query URL with site:aliexpress.com

    encodeImage = encodeURIComponent(imageLink)
    const aURL = `https://www.bing.com/images/search?view=detailv2&iss=sbi&form=SBIVSP&sbisrc=UrlPaste&q=imgurl:${encodeImage}&idpbck=1&selectedindex=0&id=${encodeImage}&ccid=13FxrdZy&simid=608044641057519927&ck=105677159D9A98AC80DCE351A61FA914&thid=OIP.13FxrdZyMFdWZvm15tLqpQHaHa&mediaurl=${encodeImage}&exph=800&expw=800&cdnurl=https%3A%2F%2Fth.bing.com%2Fth%2Fid%2FR.d77171add67230575666f9b5e6d2eaa5%3Frik%3DhRpfslLqT4YJ3g%26pid%3DImgRaw%26r%3D0&vt=2&sim=11`;

    const response = await request.get(aURL, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
        }
    });

    fs.writeFile('./response.html', response, function (err) {
        if (err) return console.log(err);
        console.log('Hello World > helloworld.txt');
    });

    const $ = cheerio.load(response);
    const searchResults = [];

    $('table.IkMU6e').each((i, element) => {
        const $element = $(element);
        const link = $element.find('a').attr('href');
        const img = $element.find('img').attr('src');
        const title = $element.find('span.fYyStc').text();

        if (link && img) {
        searchResults.push({
            url: url.parse(link, true).query.q,
            thumbnailUrl: img,
            title
        });
        }
    });

    res.json(searchResults);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
