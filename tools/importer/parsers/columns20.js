/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check if element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns block (columns20)'];

  // Find all immediate column divs (each col-lg-2 etc)
  const columnDivs = Array.from(element.querySelectorAll(':scope > .row > div'));

  // For each column, extract the main content (the circle card)
  const columns = columnDivs.map((colDiv) => {
    // Defensive: find the image inside the card
    const img = colDiv.querySelector('img');
    // If image exists, use it directly
    if (img) {
      return img;
    }
    // If no image, fallback to the whole colDiv
    return colDiv;
  });

  // Build the table rows
  const cells = [
    headerRow,
    columns,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
