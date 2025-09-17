/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the cards container
  let cardsRow;
  // Try to find the row containing the cards
  const gridContainer = element.querySelector('.grid-container');
  if (gridContainer) {
    cardsRow = gridContainer.querySelector('.row');
  }
  if (!cardsRow) {
    // fallback: maybe the element itself is the row
    cardsRow = element;
  }

  // Get all card columns (each card)
  const cardCols = Array.from(cardsRow.querySelectorAll(':scope > .col-xl-4, :scope > .col-lg-4, :scope > .col-md-12, :scope > .col-sm-12, :scope > .col-xs-12'));

  // If no columns found, fallback to any direct children with .xps-card-tile
  let cards;
  if (cardCols.length) {
    cards = cardCols.map(col => col.querySelector('.xps-card-tile'));
  } else {
    cards = Array.from(cardsRow.querySelectorAll(':scope > .xps-card-tile'));
  }

  // Build table rows for each card
  const rows = cards.map(card => {
    if (!card) return ['', ''];
    // Image: find first img inside .xps-card-tile-image
    let img = card.querySelector('.xps-card-tile-image img');
    // Title: find h6 or heading inside card
    let title = card.querySelector('h6, .xps-card-tile-title');
    // Description: If there is more text, but in this HTML, it's just the title
    // If there were more, you'd collect all children except image and heading
    // For now, just use the heading as text content
    const textCell = [];
    if (title) textCell.push(title);
    // If there were a description, add it here
    // If there were a CTA, add it here
    return [img || '', textCell.length ? textCell : ''];
  });

  // Table header
  const headerRow = ['Cards (cards18)'];
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
