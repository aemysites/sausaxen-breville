/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: must match block name exactly
  const headerRow = ['Hero (hero24)'];

  // 2. Background image (row 2)
  let imageEl = null;
  const img = element.querySelector('img');
  if (img) imageEl = img;

  // 3. Content cell (row 3): heading, subheading, CTA
  const contentCellItems = [];
  // Heading: h2.xps-card-tile-title
  const heading = element.querySelector('h2.xps-card-tile-title');
  if (heading) contentCellItems.push(heading);
  // Subheading: p inside .xps-card-tile-description
  const subheading = element.querySelector('.xps-card-tile-description p');
  if (subheading) contentCellItems.push(subheading);
  // CTA: a inside .xps-card-tile-button-wrapper
  const cta = element.querySelector('.xps-card-tile-button-wrapper a');
  if (cta) contentCellItems.push(cta);

  // 4. Table rows
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentCellItems]
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element
  element.replaceWith(block);
}
