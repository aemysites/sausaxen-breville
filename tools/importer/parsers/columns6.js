/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container holding the cards
  const gridContainer = element.querySelector('.grid-container.br-grid');
  if (!gridContainer) return;

  // Find all immediate card columns inside the grid
  const cardCols = gridContainer.querySelectorAll('.row-gap > .col-xl-3, .row-gap > .col-lg-3, .row-gap > .col-md-3, .row-gap > .col-sm-6, .row-gap > .col-xs-6');
  if (!cardCols.length) return;

  // Each cardCol contains a .xps-circle-card
  const cards = Array.from(cardCols).map(col => {
    const card = col.querySelector('.xps-circle-card');
    if (!card) return null;
    // We'll include the whole card element for resilience
    return card;
  }).filter(Boolean);

  // Table header row
  const headerRow = ['Columns block (columns6)'];
  // Content row: one cell per card
  const contentRow = cards;

  // Table cells: header row, then content row
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
