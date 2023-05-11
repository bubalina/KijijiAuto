chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && /^https:\/\/www.kijijiautos.ca\//.test(tab.url)) {
    const searchParams = new URLSearchParams(tab.url.split('?')[1]);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const yearFrom = searchParams.get('yearFrom');
    const yearTo = searchParams.get('yearTo');
    const priceFrom = searchParams.get('priceFrom');
    const priceTo = searchParams.get('priceTo');
    
    console.log('Search Query Parameters:');
    console.log(`Make: ${make}`);
    console.log(`Model: ${model}`);
    console.log(`Year Range: ${yearFrom} - ${yearTo}`);
    console.log(`Price Range: $${priceFrom} - $${priceTo}`);
  }
});
