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
  link.setAttribute('download', 'search-results.csv');
  document.body.appendChild(link);

  // Click the link to download the CSV file
  link.click();
}

// Listen for the "DOMContentLoaded" event to render the table
document.addEventListener('DOMContentLoaded', () => {
