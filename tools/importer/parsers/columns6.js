/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find the row that contains the columns
  const row = gridContainer.querySelector('.row.row-gap');
  if (!row) return;

  // Get all immediate column children
  const columnDivs = Array.from(row.children).filter(div => div.classList.contains('col-xl-3'));
  if (columnDivs.length === 0) return;

  // Each column: extract the card (image + title)
  const columns = columnDivs.map(col => {
    // Defensive: find the card container
    const card = col.querySelector('.xps-circle-card');
    if (!card) return document.createElement('div');

    // Find the image
    const imgContainer = card.querySelector('.xps-circle-card__header img');
    // Find the title
    const titleContainer = card.querySelector('.xps-circle-card__body .xps-circle-card--title');

    // Compose cell content
    const cellContent = [];
    if (imgContainer) cellContent.push(imgContainer);
    if (titleContainer) cellContent.push(titleContainer);

    return cellContent;
  });

  // Table header
  const headerRow = ['Columns block (columns6)'];
  // Table content row (one row, N columns)
  const contentRow = columns;

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
