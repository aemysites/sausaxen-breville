/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card containers
  const cardContainers = Array.from(
    element.querySelectorAll(':scope .xps-card-tile')
  );

  if (!cardContainers.length) return;

  // Header row: must be a single cell array
  const headerRow = ['Cards (cards18)'];

  // Each card row: two columns [image, text content]
  const rows = cardContainers.map(card => {
    // Image (first img inside .xps-card-tile-image)
    let imgEl = null;
    const imgContainer = card.querySelector('.xps-card-tile-image');
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
      // Remove non-standard width/height attributes if present
      if (imgEl) {
        imgEl.removeAttribute('width');
        imgEl.removeAttribute('height');
      }
    }

    // Text (h6)
    const titleEl = card.querySelector('h6');
    // For text cell, use the element itself (not array)
    return [imgEl, titleEl];
  });

  // Compose cells: header row (single cell), then each row as an array of two elements
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
