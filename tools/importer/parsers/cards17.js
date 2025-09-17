/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row: single cell with block name
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Get all immediate card columns
  const cardCols = element.querySelectorAll(':scope > div');

  cardCols.forEach((col) => {
    const cardTile = col.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Image (mandatory)
    const imgWrap = cardTile.querySelector('.xps-card-tile-image');
    let imageEl = null;
    if (imgWrap) imageEl = imgWrap.querySelector('img');

    // Title (mandatory)
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    const textCell = [];
    if (titleEl) textCell.push(titleEl);

    // Each row: [image, text]
    rows.push([
      imageEl || '',
      textCell.length ? textCell : '',
    ]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
