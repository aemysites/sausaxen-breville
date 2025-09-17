/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Cards (cards17)'];

  // Get all direct card columns
  const cardColumns = element.querySelectorAll(':scope > div');
  const rows = [headerRow];

  cardColumns.forEach((col) => {
    // Each col contains .widget-tool > .xps-card-tile
    const cardTile = col.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Image: find img inside .xps-card-tile-image
    const imgWrapper = cardTile.querySelector('.xps-card-tile-image');
    let imgEl = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Defensive: only include if image exists
    // Title: h6.xps-card-tile-title
    const titleEl = cardTile.querySelector('.xps-card-tile-title');

    // Build text cell: only title present, no description or CTA
    // Use title element directly if exists
    const textCell = [];
    if (titleEl) textCell.push(titleEl);

    // Add row: [image, text]
    rows.push([
      imgEl || '',
      textCell.length > 0 ? textCell : ''
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with block
  element.replaceWith(block);
}
