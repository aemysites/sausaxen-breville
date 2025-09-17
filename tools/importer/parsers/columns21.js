/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns from the split teaser structure
  // Left: image/media, Right: content (heading, description)
  let leftCol = null;
  let rightCol = null;

  // Find the .teaser inside the block
  const teaser = element.querySelector('.teaser');
  if (teaser) {
    leftCol = teaser.querySelector('.xps-teaser.left');
    rightCol = teaser.querySelector('.xps-teaser__content');
  }

  // Fallback: if not found, try to find two main children
  if (!leftCol || !rightCol) {
    const divs = element.querySelectorAll(':scope > div');
    if (divs.length >= 2) {
      leftCol = divs[0];
      rightCol = divs[1];
    }
  }

  // Defensive: if still not found, use the whole element as a single column
  if (!leftCol && !rightCol) {
    leftCol = element;
    rightCol = '';
  }

  // Ensure all content is included and referenced (not cloned)
  // Table header must match block name exactly
  const headerRow = ['Columns block (columns21)'];
  const columnsRow = [leftCol, rightCol];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
