/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single column array
  const rows = [['Cards (cards8)']];
  // Each card column
  element.querySelectorAll(':scope > div').forEach((col) => {
    const card = col.querySelector(':scope > div');
    if (!card) return;
    const img = card.querySelector('img');
    const textBlock = card.querySelector('.xps-text');
    if (!img || !textBlock) return;
    // Each card row: array of two cells
    rows.push([img, textBlock]);
  });
  // Use WebImporter.DOMUtils.createTable to ensure correct header row structure
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
