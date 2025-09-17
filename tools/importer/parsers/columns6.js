/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container holding all cards
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find all direct child columns (each contains a circle card)
  const cardColumns = gridContainer.querySelectorAll('.row-gap > .col-xl-3, .row-gap > .col-lg-3, .row-gap > .col-md-3, .row-gap > .col-sm-6, .row-gap > .col-xs-6');

  // Defensive: fallback if no columns found
  if (!cardColumns || cardColumns.length === 0) return;

  // For each column, extract the card content (image + label)
  const cards = Array.from(cardColumns).map(col => {
    // The card is inside the column
    const card = col.querySelector('.xps-circle-card');
    if (!card) return document.createElement('div'); // fallback empty div
    // We'll include the whole card element for resilience
    return card;
  });

  // Table header row
  const headerRow = ['Columns block (columns6)'];
  // Table content row: one cell per card
  const contentRow = cards;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
