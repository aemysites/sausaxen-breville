/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  // Table header row: must be one column only
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Get all immediate card containers
  const cardCols = element.querySelectorAll(':scope > div');
  cardCols.forEach((col) => {
    // Each card is inside a col, which contains the card div
    const card = col.querySelector(':scope > div');
    if (!card) return;

    // Find the image/icon (first img in card)
    const img = card.querySelector('img');

    // Find the text content (usually a div with a p)
    const textDiv = card.querySelector('.xps-text');
    let textContent = textDiv;
    if (!textDiv) {
      const p = card.querySelector('p');
      textContent = p || '';
    }

    // Build the row: [image, text]
    // Each row must be an array in the cells array
    rows.push([img, textContent]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
