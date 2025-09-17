/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  // Find the grid container (where the cards live)
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find all circle cards inside the grid
  const cardCols = gridContainer.querySelectorAll('.xps-circle-card');
  if (!cardCols.length) return;

  // Each card will be a column cell in the second row
  const cardCells = Array.from(cardCols).map(card => {
    // Defensive: find image and title
    const img = card.querySelector('img');
    const title = card.querySelector('.xps-circle-card--title');
    // Compose cell content: image + title
    const cellContent = [];
    if (img) cellContent.push(img);
    if (title) cellContent.push(title);
    return cellContent;
  });

  // Table rows
  const headerRow = ['Columns block (columns6)'];
  const contentRow = cardCells;

  // Build block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(blockTable);
}
