/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all direct column divs
  const colDivs = Array.from(element.querySelectorAll(':scope > .row > .col-lg-2'));

  // Each column's main content is the image inside a button inside aspect-ratio
  const cells = [];

  colDivs.forEach((colDiv) => {
    // Find the image inside this column
    const img = colDiv.querySelector('img');
    if (img) {
      cells.push(img);
    } else {
      // If no image, push empty string
      cells.push('');
    }
  });

  // Table header
  const headerRow = ['Columns block (columns20)'];
  // Second row: all columns side by side
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
