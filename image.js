// Get the image link from the user
const imageLink = prompt('Enter image link');

// Perform the search with "site:aliexpress.com"
const searchQuery = `site:aliexpress.com ${imageLink}`;
const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`;

// Make a request to the search URL and parse the HTML response
fetch(searchUrl)
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = doc.querySelectorAll('img.rg_i');

    // Display the images on your website
    const resultsContainer = document.getElementById('results-container');
    images.forEach(img => {
      const src = img.getAttribute('src');
      const result = document.createElement('img');
      result.src = src;
      resultsContainer.appendChild(result);
    });
  });



