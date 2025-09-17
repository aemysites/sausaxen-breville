/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all direct card columns
  const cardCols = element.querySelectorAll(':scope > div');
  const rows = [];

  // Always use the required header row
  const headerRow = ['Cards (cards17)'];
  rows.push(headerRow);

  cardCols.forEach((col) => {
    // Defensive: find the card tile inside the col
    const cardTile = col.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Find the image (first image in the card tile)
    const imgWrapper = cardTile.querySelector('.xps-card-tile-image');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }

    // Find the title (h6)
    const title = cardTile.querySelector('h6');

    // Compose the text cell: title only (no description or CTA in this HTML)
    // If title exists, use it directly
    let textCell = '';
    if (title) {
      textCell = title;
    }

    // Only add row if image and title exist
    if (img && textCell) {
      rows.push([img, textCell]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
