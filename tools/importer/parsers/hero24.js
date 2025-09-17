/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the image (background/decorative)
  let imgEl = element.querySelector('img');
  // Defensive: Find the main content area
  let titleEl = element.querySelector('h2');
  let descEl = element.querySelector('.xps-card-tile-description');
  let ctaWrapper = element.querySelector('.xps-card-tile-button-wrapper');
  let ctaEl = ctaWrapper ? ctaWrapper.querySelector('a') : null;

  // Compose the content cell for the text/button
  const contentCell = [];
  if (titleEl) contentCell.push(titleEl);
  if (descEl) contentCell.push(descEl);
  if (ctaEl) contentCell.push(ctaEl);

  // Table rows
  const headerRow = ['Hero (hero24)'];
  const imageRow = [imgEl ? imgEl : ''];
  const contentRow = [contentCell];

  // Build the table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
