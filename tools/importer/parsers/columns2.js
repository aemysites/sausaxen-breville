/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main split teaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find left (content) and right (media) columns
  const leftCol = splitTeaser.querySelector('.xps-teaser__content');
  const rightCol = splitTeaser.querySelector('.xps-teaser--media');

  // Defensive: If either column is missing, abort
  if (!leftCol || !rightCol) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns2)'];

  // Table content row: reference the actual DOM nodes
  const contentRow = [leftCol, rightCol];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
