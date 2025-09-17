/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row: exactly one column, block name only
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Get all direct card columns (each card is inside a col-*)
  const cardCols = element.querySelectorAll(':scope > div');

  cardCols.forEach((col) => {
    const card = col.querySelector('.xps-support-card');
    if (!card) return;
    const img = card.querySelector('img');
    const textBlock = card.querySelector('.xps-text');
    if (img && textBlock) {
      rows.push([img, textBlock]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  // Do NOT set colspan on header cell; leave as single column only

  element.replaceWith(blockTable);
}
