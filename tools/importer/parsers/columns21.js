/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main splitteaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Left column: find the left teaser (image and decorative items)
  let leftCol = null;
  const leftTeaser = splitTeaser.querySelector('.xps-teaser.left');
  if (leftTeaser) {
    leftCol = leftTeaser;
  }

  // Right column: heading and description
  let rightCol = null;
  const rightContent = splitTeaser.querySelector('.xps-teaser__content');
  if (rightContent) {
    // Use the card-tile for content if present
    const cardTile = rightContent.querySelector('.xps-card-tile');
    rightCol = cardTile || rightContent;
  }

  // Build the table rows
  const headerRow = ['Columns block (columns21)'];
  const contentRow = [leftCol, rightCol];

  // Create the table block
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
