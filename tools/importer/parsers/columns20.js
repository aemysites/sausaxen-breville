/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per guidelines
  const headerRow = ['Columns block (columns20)'];

  // Find all columns (each .col-lg-2 is a column)
  const colDivs = Array.from(element.querySelectorAll(':scope > .row > div'));

  // For each column, reference the content element (the card)
  const columnCells = colDivs.map((colDiv) => {
    // Find the card inside the column
    const card = colDiv.querySelector('.xps-circle-card');
    // Defensive: if not found, fallback to colDiv itself
    return card || colDiv;
  });

  // Build the table rows: header, then columns
  const rows = [
    headerRow,
    columnCells,
  ];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
