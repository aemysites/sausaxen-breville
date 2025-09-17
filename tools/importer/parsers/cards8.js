/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element || !document) return;

  // Table header row (must match block name and variant)
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Get all direct card columns
  const cardCols = element.querySelectorAll(':scope > div');
  cardCols.forEach((col) => {
    // Each col contains a card
    const card = col.querySelector(':scope > div');
    if (!card) return;

    // Find image (first img)
    const img = card.querySelector('img');
    // Find text block (div with class xps-text)
    const textBlock = card.querySelector('.xps-text');

    // Defensive: only add if both image and text exist
    if (img && textBlock) {
      rows.push([img, textBlock]);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element with block table
  element.replaceWith(block);
}
