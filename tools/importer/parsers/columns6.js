/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container that holds all the cards
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find the row that contains all the columns
  const row = gridContainer.querySelector('.row');
  if (!row) return;

  // Get all immediate column divs (each is a column)
  const colDivs = Array.from(row.children).filter(child => child.classList.contains('col-xl-3'));
  if (colDivs.length === 0) return;

  // For each column, extract the card content (image + title)
  const columnCells = colDivs.map(col => {
    // Defensive: Find the card inside the column
    const card = col.querySelector('.xps-circle-card');
    if (!card) return document.createElement('div');
    // Get image
    const imgHeader = card.querySelector('.xps-circle-card__header img');
    // Get title
    const titleDiv = card.querySelector('.xps-circle-card__body .xps-circle-card--title');
    // Compose cell: image (if exists) + title (if exists)
    const cellContent = [];
    if (imgHeader) cellContent.push(imgHeader);
    if (titleDiv) cellContent.push(titleDiv);
    // Return as array for cell
    return cellContent;
  });

  // Table rows: header, then content row
  const headerRow = ['Columns block (columns6)'];
  const contentRow = columnCells;
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
