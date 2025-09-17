/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardEl) {
    // Find image (first img inside card)
    const imgContainer = cardEl.querySelector('.xps-card-tile-image');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Find title (h6 inside card)
    const title = cardEl.querySelector('.xps-card-tile-title');
    // Compose text cell: title only (no description or CTA in source)
    let textCell = [];
    if (title) {
      textCell.push(title);
    }
    return [img, textCell];
  }

  // Get all card elements (each .widget-tool contains a card)
  const cardWrappers = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  // Header row: must have exactly one column
  rows.push(['Cards (cards17)']);
  // Card rows
  cardWrappers.forEach((colEl) => {
    const cardTile = colEl.querySelector('.xps-card-tile');
    if (cardTile) {
      const [img, textCell] = extractCardContent(cardTile);
      // Defensive: only add row if image and text
      if (img && textCell.length) {
        rows.push([img, textCell]);
      }
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with block
  element.replaceWith(block);
}
