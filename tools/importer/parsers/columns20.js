/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Table header row as per block guidelines
  const headerRow = ['Columns block (columns20)'];

  // Find the row containing the columns
  const row = element.querySelector('.row');
  if (!row) return;

  // Get all immediate column divs
  const columnDivs = Array.from(row.children);

  // For each column, extract the main circle card image
  const cells = columnDivs.map((colDiv) => {
    // Defensive: find the image inside the button
    const img = colDiv.querySelector('img');
    // If found, use the image element, else empty string
    return img || '';
  });

  // Compose the table rows
  const tableRows = [headerRow, cells];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
