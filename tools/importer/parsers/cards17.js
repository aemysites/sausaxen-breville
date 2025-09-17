/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row: must be exactly one column with the block name
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all direct card columns
  const cardColumns = element.querySelectorAll(':scope > div');

  cardColumns.forEach((col) => {
    const cardTile = col.querySelector('.xps-card-tile');
    if (!cardTile) return;
    const imgWrapper = cardTile.querySelector('.xps-card-tile-image');
    let imgEl = null;
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    if (imgEl && titleEl) {
      rows.push([imgEl, titleEl]);
    }
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
