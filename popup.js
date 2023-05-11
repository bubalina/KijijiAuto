// Function to render the table rows with search results
function renderTableRows(searchResults) {
  // Get the table body element
  const tableBody = document.querySelector('#results tbody');

  // Clear any existing rows from the table body
  tableBody.innerHTML = '';

  // Loop through the search results and create a new row for each result
  searchResults.forEach((result) => {
    // Create a new table row element
    const row = document.createElement('tr');

    // Create table cells for each field in the result object
    const photoCell = document.createElement('td');
    const photoImg = document.createElement('img');
    photoImg.src = result.photoUrl;
    photoCell.appendChild(photoImg);

    const yearCell = document.createElement('td');
    yearCell.textContent = result.year;

    const makeCell = document.createElement('td');
    makeCell.textContent = result.make;

    const modelCell = document.createElement('td');
    modelCell.textContent = result.model;

    const trimCell = document.createElement('td');
    trimCell.textContent = result.trim;

    const styleCell = document.createElement('td');
    styleCell.textContent = result.style;

    const regionCell = document.createElement('td');
    regionCell.textContent = result.region;

    const kilometersCell = document.createElement('td');
    kilometersCell.textContent = result.kilometers;

    const priceCell = document.createElement('td');
    priceCell.textContent = result.price;

    const wholesalePriceCell = document.createElement('td');
    wholesalePriceCell.textContent = result.wholesalePrice;

    const profitAmountCell = document.createElement('td');
    profitAmountCell.classList.add('profit');
    profitAmountCell.classList.add(result.profitAmount >= 0 ? 'positive' : 'negative');
    profitAmountCell.textContent = result.profitAmount;

    const profitMarginCell = document.createElement('td');
    profitMarginCell.classList.add('profit');
    profitMarginCell.classList.add(result.profitMargin >= 0 ? 'positive' : 'negative');
    profitMarginCell.textContent = result.profitMargin;

    // Append the cells to the row
    row.appendChild(photoCell);
    row.appendChild(yearCell);
    row.appendChild(makeCell);
    row.appendChild(modelCell);
    row.appendChild(trimCell);
    row.appendChild(styleCell);
    row.appendChild(regionCell);
    row.appendChild(kilometersCell);
    row.appendChild(priceCell);
    row.appendChild(wholesalePriceCell);
    row.appendChild(profitAmountCell);
    row.appendChild(profitMarginCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

// Function to handle clicks on the "Export to CSV" button
function handleExportButtonClick() {
  // Set the name of the CSV file with current date and time
  const fileName = `kijiji_auto_search_results_${new Date().toISOString().replace(/:/g, '.')}.csv`;

  // Get the table element
  const table = document.querySelector('#results');

  // Create a new CSV file with the table data
  let csvContent = 'data:text/csv;charset=utf-8,';
  const rows = table.querySelectorAll('tr');
  rows.forEach((row) => {
    const cells = row.querySelectorAll('th, td');
    const rowData = Array.from(cells)
      .map((cell) => cell.textContent)
      .join(',');
    csvContent += rowData + '\r\n';
  });

  // Create a temporary link to download the CSV file
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
.querySelector('#pagination').textContent = paginationMessage;
} 

  // Set the name of the CSV file with current date and time
  const dateTime = new Date().toISOString().replace(/:/g, '-');
  const filename = `kijiji_auto_search_results_${dateTime}.csv`;

  // Click the link to download the CSV file
  link.click();
}

// Function to handle clicks on the "Next Page" button
function handleNextPageClick() {
  // Get the next page of search results
  const nextPage = savedResults[currentPage + 1];

  // If there are no more pages, disable the button and return
  if (!nextPage) {
    const nextPageButton = document.querySelector('#next-page-button');
    nextPageButton.setAttribute('disabled', true);
    return;
  }

  // Increment the current page index
  currentPage++;

  // Render the next page of search results
  renderTableRows(nextPage);

  // Update the pagination message
  const totalResults = savedResults.reduce((count, results) => count + results.length, 0);
  const displayedResults = savedResults.slice(0, currentPage + 1).reduce((count, results) => count + results.length, 0);
  const paginationMessage = `Showing ${displayedResults} of ${totalResults} saved results`;
  document.querySelector('#pagination').textContent = paginationMessage;
}

// Function to handle clicks on the "Save Results" button
function handleSaveResultsClick() {
  // Add the current page of search results to the saved results array
  const results = document.querySelectorAll('#results tbody tr');
  const savedPage = Array.from(results).map((result) => ({
    photoUrl: result.querySelector('img').src,
    year: result.querySelectorAll('td')[0].textContent,
    make: result.querySelectorAll('td')[1].textContent,
    model: result.querySelectorAll('td')[2].textContent,
    trim: result.querySelectorAll('td')[3].textContent,
    style: result.querySelectorAll('td')[4].textContent,
    region: result.querySelectorAll('td')[5].textContent,
    kilometers: result.querySelectorAll('td')[6].textContent,
    price: result.querySelectorAll('td')[7].textContent,
    wholesalePrice: result.querySelectorAll('td')[8].textContent,
    profitAmount: result.querySelectorAll('td')[9].textContent,
    profitMargin: result.querySelectorAll('td')[10].textContent,
  }));
  savedResults.push(savedPage);

  // Display a confirmation message
  alert('Results saved!');

  // Reset the current page index to 0
  currentPage = 0;
}


  // Enable the "Next Page" button and reset the current page index
  const nextPageButton = document.querySelector('#next-page-button');
  nextPageButton.removeAttribute('disabled');
  currentPage = 0;

  // Update the pagination message
  const totalResults = savedResults.reduce((count, results) => count + results.length, 0);
  const paginationMessage = `Showing ${savedPage.length} of ${totalResults} saved
  
  // Function to update the pagination message
function updatePaginationMessage(savedResults, savedPage) {
  const totalResults = savedResults.reduce((count, results) => count + results.length, 0);
  const paginationMessage = `Showing ${savedPage.length} of ${totalResults} saved results`;
  document.querySelector('#pagination-message').textContent = paginationMessage;
}

// Function to show the next page of saved search results
function showNextPage(savedResults, currentPage) {
  const nextPageIndex = currentPage + 1;
  if (nextPageIndex < savedResults.length) {
    const nextPage = savedResults[nextPageIndex];
    renderTableRows(nextPage);
    updatePaginationMessage(savedResults, nextPage);
    return nextPageIndex;
  }
  return currentPage;
}

// Function to handle clicks on the "Next Page" button
function handleNextPageButtonClick(savedResults, currentPage, setCurrentPage) {
  const nextPage = showNextPage(savedResults, currentPage);
  setCurrentPage(nextPage);
}

// Function to save search results to local storage
function saveSearchResults(searchResults) {
  const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
  savedResults.push(searchResults);
  localStorage.setItem('savedResults', JSON.stringify(savedResults));
}

// Function to load saved search results from local storage
function loadSavedSearchResults() {
  const savedResults = JSON.parse(localStorage.getItem('savedResults')) || [];
  return savedResults;
}

// Function to render the table with saved search results
function renderSavedSearchResults(savedResults) {
  // Get the table body element
  const tableBody = document.querySelector('#results tbody');

  // Clear any existing rows from the table body
  tableBody.innerHTML = '';

  // Loop through the saved search results and create a new row for each result
  savedResults.forEach((page) => {
    page.forEach((result) => {
      // Create a new table row element
      const row = document.createElement('tr');

      // Create table cells for each field in the result object
      const photoCell = document.createElement('td');
      const photoImg = document.createElement('img');
      photoImg.src = result.photoUrl;
      photoCell.appendChild(photoImg);

      const yearCell = document.createElement('td');
      yearCell.textContent = result.year;

      const makeCell = document.createElement('td');
      makeCell.textContent = result.make;

      const modelCell = document.createElement('td');
      modelCell.textContent = result.model;

      const trimCell = document.createElement('td');
      trimCell.textContent = result.trim;

      const styleCell = document.createElement('td');
      styleCell.textContent = result.style;

      const regionCell = document.createElement('td');
      regionCell.textContent = result.region;

      const kilometersCell = document.createElement('td');
      kilometersCell.textContent = result.kilometers;

      const priceCell = document.createElement('td');
      priceCell.textContent = result.price;

      const wholesalePriceCell = document.createElement('td');
      wholesalePriceCell.textContent = result.wholesalePrice;

      const profitAmountCell = document.createElement('td');
      profitAmountCell.classList.add('profit');
      profitAmountCell.classList.add(result.profitAmount >= 0 ? 'positive' : 'negative');
      profitAmountCell.textContent = result.profitAmount;

      const profitMarginCell = document.createElement('td');
      profitMarginCell.classList.add('profit');
      profitMarginCell.classList.add(result.profitMargin >= 0 ? 'positive' : 'negative');
      profitMarginCell.textContent = result.profitMargin;

      /// Append the cells to the row
      row.appendChild(photoCell);
      row.appendChild(yearCell);
      row.appendChild(makeCell);
      row.appendChild(modelCell);
      row.appendChild(trimCell);
      row.appendChild(styleCell);
      row.appendChild(regionCell);
      row.appendChild(kilometersCell);
      row.appendChild(priceCell);
      row.appendChild(wholesalePriceCell);
      row.appendChild(profitAmountCell);
      row.appendChild(profitMarginCell);

      // Append the row to the table body
      tableBody.appendChild(row);
  });
  }
      // Update the pagination message
      const paginationMessage = 'Showing 0 saved results';
      document.querySelector('#pagination-message').textContent = paginationMessage;

      // Disable the "Next Page" button
      const nextPageButton = document.querySelector('#next-page-button');
      nextPageButton.disabled = true;

      // Disable the "Save Results" button
      const saveResultsButton = document.querySelector('#save-results-button');
      saveResultsButton.disabled = true;

      return;
       }

      // Get the search results for the current page
      const savedPage = savedResults[currentPageIndex];

      // Loop through the saved search results and create a new row for each result
      savedPage.forEach((result, index) => {
      // Create a new table row element
      const row = document.createElement('tr');
      
      // Create a cell for the row number
      const rowNumberCell = document.createElement('td');
      rowNumberCell.textContent = index

