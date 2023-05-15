// Function to parse the search results page and extract the data we want 
function parseSearchResults() {
  let results = [];
  let items = document.querySelectorAll(".search-item");
  items.forEach((item) => {
    let data = {};
    data.thumbnail = item.querySelector("img").src;
    data.year = item.querySelector(".title span:first-child").textContent;
    data.make = item.querySelector(".title span:nth-child(2)").textContent;
    data.model = item.querySelector(".title span:nth-child(3)").textContent;
    data.trim = item.querySelector(".title span:nth-child(4)").textContent;
    data.style = item.querySelector(".title span:nth-child(5)").textContent;
    data.region = item.querySelector(".location").textContent.trim().split(",")[1];
    data.kilometers = item.querySelector(".kms").textContent.trim();
    data.price = item.querySelector(".price").textContent.trim();
    let link = item.querySelector("a.listing-link");
    data.url = link.href;
    results.push(data);
  });
  return results;
}

// Send a message to the background script with the search results
chrome.runtime.sendMessage({ results: parseSearchResults() });
