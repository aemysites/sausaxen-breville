/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card tile elements
  const cardTiles = element.querySelectorAll('.xps-card-tile');

  // Table header row: must be a single cell
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // For each card, extract image and text
  cardTiles.forEach((card) => {
    // Image in first cell
    const imgEl = card.querySelector('.xps-card-tile-image img');
    // Text in second cell (title only in this HTML)
    const titleEl = card.querySelector('.xps-card-tile-title');
    // Use the element directly (not as array)
    const textCell = titleEl || '';
    rows.push([imgEl, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
