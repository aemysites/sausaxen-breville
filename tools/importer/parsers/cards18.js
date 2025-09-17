/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container holding the cards
  const grid = element.querySelector('.grid-container');
  if (!grid) return;

  // Find all card columns within the grid
  const cardCols = grid.querySelectorAll('.row > .col-xl-4, .row > .col-lg-4, .row > .col-md-12, .row > .col-sm-12, .row > .col-xs-12');

  // Prepare the header row
  const headerRow = ['Cards (cards18)'];
  const rows = [headerRow];

  // For each card column, extract image and text content
  cardCols.forEach((col) => {
    // Defensive: Find the card tile inside the column
    const card = col.querySelector('.xps-card-tile');
    if (!card) return;

    // Find image container and image
    const imgContainer = card.querySelector('.xps-card-tile-image');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Find the card title (h6)
    const titleEl = card.querySelector('.xps-card-tile-title');

    // Compose the text cell: if title exists, use it
    let textCell = [];
    if (titleEl) textCell.push(titleEl);

    // Add the row: image in first cell, text in second
    rows.push([
      imgEl || '',
      textCell.length ? textCell : '',
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
