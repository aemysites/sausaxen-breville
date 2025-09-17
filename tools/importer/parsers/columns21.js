/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main split teaser area
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find the left (image/media) and right (content) columns
  const leftCol = splitTeaser.querySelector('.xps-teaser.left');
  const rightCol = splitTeaser.querySelector('.xps-teaser__content');

  // Defensive: if either column is missing, abort
  if (!leftCol || !rightCol) return;

  // Header row as required
  const headerRow = ['Columns block (columns21)'];

  // Second row: two columns, left is image/media, right is content
  const cellsRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
