/*
 * Kijiji Auto Wholesale Price Comparison Extension
 *
 * This Chrome extension listens for the user to navigate to Kijiji Auto and extracts
 * the search query parameters. It then sends an HTTP request to ICBC Canadian
 * Black Book to retrieve the wholesale prices for each vehicle in the search
 * results. The extension then displays the results in a table, including
 * the Year, Make, Model, Trim, Style, KM, Region, Kijiji Price, and
 * Wholesale Price for each vehicle.
 *
 * The extension is activated by clicking on the Chrome extension icon while on a Kijiji Auto page.
 *
 * Limitations:
 * - The extension only works for Kijiji Auto searches in Canada
 * - The extension only displays wholesale prices for vehicles in British Columbia
 * - The extension only displays prices for vehicles in the following categories:
 *   Cars & Trucks, SUVs & Crossovers, Vans, and Classic Cars
 * 
 * Copyright (c) Martha Tessema, 2023
 * Author: Martha Tessema (https://github.com/bubalina)
 * Version: 1.0
 * Date: May 10, 2023
 */

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
