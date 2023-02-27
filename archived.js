const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch('e48df18cda11c75810843f7b207fc8e4882e8045');

const imageUrl = "https://www.bugatti.com/fileadmin/_processed_/sei/p63/se-image-ce40627babaa7b180bc3dedd4354d61c.jpg"; // what we want to search

const params = {
  engine: "google_reverse_image", // search engine
  image_url: imageUrl, // search image
};

const getJson = () => {
  return new Promise((resolve) => {
    search.json(params, resolve);
  });
};

const getResults = async () => {
  const organicResults = [];
  while (true) {
    const json = await getJson();
    if (json.search_information?.organic_results_state === "Fully empty") break;
    organicResults.push(...json.image_results);
    params.start ? (params.start += 10) : (params.start = 10);
  }
  return organicResults;
};

getResults().then((result) => console.dir(result, { depth: null }));
