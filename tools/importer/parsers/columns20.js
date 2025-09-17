/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find all columns (should be direct children of .row)
  const row = element.querySelector(':scope > .row');
  const columns = row ? Array.from(row.children) : [];

  // Step 2: For each column, extract the image element (reference, do not clone)
  const cellsRow = columns.map((col) => {
    const img = col.querySelector('img');
    return img || col; // If no image, fall back to the col div
  });

  // Step 3: Build the table rows
  const headerRow = ['Columns block (columns20)'];
  const rows = [headerRow, cellsRow];

  // Step 4: Create the table using DOMUtils (do not use markdown, only HTML)
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Step 5: Replace the original element with the table
  element.replaceWith(table);
}
