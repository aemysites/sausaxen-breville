/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container that holds the cards
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find the row that contains all the columns
  const row = gridContainer.querySelector('.row');
  if (!row) return;

  // Get all immediate column divs (each holds a circle card)
  const colDivs = Array.from(row.children).filter(child => child.classList.contains('col-xl-3'));

  // For each column, extract the card (image + title)
  const cells = colDivs.map(col => {
    // Find the card body
    const card = col.querySelector('.xps-circle-card');
    if (!card) return document.createElement('div'); // fallback empty

    // Get image
    const imgHeader = card.querySelector('.xps-circle-card__header img');
    // Get title
    const titleDiv = card.querySelector('.xps-circle-card__body .xps-circle-card--title');

    // Compose cell: image above, title below
    const cellContent = [];
    if (imgHeader) cellContent.push(imgHeader);
    if (titleDiv) cellContent.push(titleDiv);
    return cellContent;
  });

  // Table rows: header, then one row with all columns
  const headerRow = ['Columns block (columns6)'];
  const contentRow = cells;

  const tableArr = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(block);
}
