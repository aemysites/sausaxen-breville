/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main split teaser container
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find the left column (image/media)
  const leftCol = splitTeaser.querySelector('.xps-teaser--media');
  // Find the right column (content)
  const rightCol = splitTeaser.querySelector('.xps-teaser__content');

  // Defensive: If either column is missing, abort
  if (!leftCol || !rightCol) return;

  // Table header: must match target block name exactly
  const headerRow = ['Columns block (columns1)'];
  // Table content row: reference the actual DOM elements
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
