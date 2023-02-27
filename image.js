async function searchAliexpressByImage(imageLink) {
  // Encode the image link to be used in the search query
  const encodedImageLink = encodeURIComponent(imageLink);
  console.log(
    `Searching AliExpress for products similar to ${encodedImageLink}`
  );
  // Build the search query
  const searchQuery = `http://localhost:5000/search?q=${encodedImageLink}`;

  // Make the search request
  const response = await fetch(searchQuery);
  const results = await response.json();

  // Return the search results
  return results;
}


