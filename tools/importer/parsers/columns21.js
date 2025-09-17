/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main split teaser content
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find the left and right column wrappers
  const leftCol = splitTeaser.querySelector('.xps-teaser.left');
  const rightCol = splitTeaser.querySelector('.xps-teaser__content');

  // Defensive: ensure both columns exist
  if (!leftCol || !rightCol) return;

  // --- LEFT COLUMN ---
  // Find the image inside the left column
  let leftImg = leftCol.querySelector('img');
  // If there is extra decorative content (corn, salmon, etc.), include the entire media wrapper
  let leftMedia = leftCol.querySelector('.xps-teaser--media');
  // Use the whole media block if available, otherwise just the image
  const leftCell = leftMedia || leftImg || leftCol;

  // --- RIGHT COLUMN ---
  // The right column contains heading and description
  // Use the card tile content block for all text
  let rightContent = rightCol.querySelector('.xps-card-tile') || rightCol;
  const rightCell = rightContent;

  // Table header
  const headerRow = ['Columns block (columns21)'];
  // Table columns row
  const columnsRow = [leftCell, rightCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
