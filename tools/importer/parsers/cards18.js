/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from the grid
  function getCards(container) {
    // Defensive: find all cards by class
    return Array.from(
      container.querySelectorAll('.xps-card-tile')
    );
  }

  // Find the grid container (defensive: look for .grid-container or .br-grid)
  let gridContainer = element.querySelector('.grid-container') || element.querySelector('.br-grid');
  if (!gridContainer) gridContainer = element; // fallback if not found

  // Find the row with cards
  let cardRow = gridContainer.querySelector('.row');
  if (!cardRow) cardRow = gridContainer; // fallback

  const cards = getCards(cardRow);

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards18)']);

  // For each card, extract image and text
  cards.forEach(card => {
    // Image: find the first img inside the card
    const imgContainer = card.querySelector('.xps-card-tile-image');
    let img = imgContainer ? imgContainer.querySelector('img') : null;

    // Text: find the title (h6) and any description (not present here, but future-proof)
    const title = card.querySelector('h6');
    // Defensive: if more text, include it
    const textElements = [];
    if (title) textElements.push(title);
    // If there are other paragraphs, include them
    const paragraphs = Array.from(card.querySelectorAll('p'));
    paragraphs.forEach(p => textElements.push(p));

    // If no paragraphs, but the title exists, that's all
    const textCell = textElements.length === 1 ? textElements[0] : textElements;

    // Add row: [image, text]
    rows.push([
      img,
      textCell
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
