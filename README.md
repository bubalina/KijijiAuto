# Kijiji Auto Wholesale Price Comparison Extension

This Chrome extension displays a table of Kijiji auto search results and compares price to wholesale prices by Canadian Black Book.

The extension listens for the user to navigate to Kijiji Auto and extracts the search query parameters. It then sends an HTTP request to Canadian Black Book to retrieve the wholesale prices for each vehicle in the search results. The extension then displays the results in a table, including the Year, Make, Model, Trim, Style, KM, Region, Kijiji Price, and Wholesale Price for each vehicle.

The table is updated whenever the user navigates to a new search results page on Kijiji Auto.

## Usage:

1. Install the extension in Google Chrome
2. Navigate to Kijiji Auto and perform a search
3. Click on the extension icon to activate the table display
4. The table of search results and corresponding wholesale prices will be displayed

## Limitations:

- The extension only works for Kijiji Auto searches in Canada
- The extension only displays wholesale prices for vehicles in British Columbia
- The extension only displays prices for vehicles in the following categories: Cars & Trucks, SUVs & Crossovers, Vans, and Classic Cars

## Author:


Copyright © 2023 Martha Tessema (https://github.com/bubalina)
Version: 1.0
Date: May 10, 2023
