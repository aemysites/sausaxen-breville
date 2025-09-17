/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the left and right column containers
  // The structure is: split-teaser-wrapper > grid-container-fluid > grid-container > xps-splitteaser > teaser > left/right
  // We want the image (left) and the content (right)

  // Find the main splitteaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find the teaser (contains left and right)
  const teaser = splitTeaser.querySelector('.teaser');
  if (!teaser) return;

  // Left column: image
  const leftCol = teaser.querySelector('.xps-teaser.left');
  let leftCellContent = '';
  if (leftCol) {
    // Find the image inside leftCol
    const img = leftCol.querySelector('img');
    if (img) {
      leftCellContent = img;
    }
  }

  // Right column: text content
  let rightCellContent = '';
  const rightContent = teaser.querySelector('.xps-teaser__content');
  if (rightContent) {
    // Use the card tile (contains h2 and description)
    const cardTile = rightContent.querySelector('.xps-card-tile');
    if (cardTile) {
      rightCellContent = cardTile;
    } else {
      rightCellContent = rightContent;
    }
  }

  // Build the table rows
  const headerRow = ['Columns block (columns21)'];
  const contentRow = [leftCellContent, rightCellContent];
  const cells = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
