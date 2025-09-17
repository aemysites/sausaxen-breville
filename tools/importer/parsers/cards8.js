/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card columns (direct children of the row)
  const cardCols = element.querySelectorAll(':scope > div');

  // Table header row as per block guidelines
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // For each card column, extract image and text
  cardCols.forEach((col) => {
    // Defensive: find the card container inside the column
    const card = col.querySelector(':scope > div');
    if (!card) return;

    // Find the image (icon)
    const img = card.querySelector('img');
    // Find the text block (usually a div with a p)
    const textBlock = card.querySelector('.xps-text');

    // Defensive: skip if no image or text
    if (!img || !textBlock) return;

    // Reference the actual elements (do not clone)
    rows.push([img, textBlock]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
