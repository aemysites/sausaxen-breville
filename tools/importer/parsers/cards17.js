/* global WebImporter */
export default function parse(element, { document }) {
  // Get each card column
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare table rows
  const rows = [];
  // Header row: always use the block name as specified
  const headerRow = ['Cards (cards17)'];
  rows.push(headerRow);

  // For each card column, extract image and title
  columns.forEach((col) => {
    // Defensive: look for the card tile inside the column
    const card = col.querySelector('.xps-card-tile');
    if (!card) return;

    // Image: find the first <img> inside the card
    const imgWrapper = card.querySelector('.xps-card-tile-image');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }
    // Title: find the heading (h6)
    const title = card.querySelector('.xps-card-tile-title');

    // Defensive: skip if no image or no title
    if (!img || !title) return;

    // For text cell: wrap the title in a <strong>
    const strong = document.createElement('strong');
    strong.textContent = title.textContent;

    // Each row: [image, textCell]
    rows.push([img, strong]);
  });

  // Build the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
