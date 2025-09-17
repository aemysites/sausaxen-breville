/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the left and right column wrappers
  // Left: image/media
  // Right: content (title, description)

  // Find the left column (image)
  let leftCol;
  let imgEl;
  // Find the right column (content)
  let rightCol;

  // The structure is: 
  // .split-teaser-wrapper > .grid-container-fluid > .grid-container > .xps-splitteaser > .teaser > .xps-teaser.left.width-50.center (left) + .xps-teaser__content (right)
  // But the .xps-teaser__content is inside the left wrapper, so we need to split them

  // Find the main teaser
  const teaser = element.querySelector('.teaser.xps-teaser--cs-image-left');
  if (!teaser) return;

  // Find the left column
  leftCol = teaser.querySelector('.xps-teaser.left.width-50.center');
  if (!leftCol) return;

  // Find the image inside leftCol
  imgEl = leftCol.querySelector('.xps-teaser--media img');
  // Defensive: if not found, try any img
  if (!imgEl) {
    imgEl = leftCol.querySelector('img');
  }

  // Find the right column content
  rightCol = leftCol.querySelector('.xps-teaser__content');
  if (!rightCol) return;

  // Get the card tile content (title, description)
  const cardTile = rightCol.querySelector('.xps-card-tile');
  let titleEl = cardTile ? cardTile.querySelector('.xps-card-tile-title') : null;
  let descEl = cardTile ? cardTile.querySelector('.xps-card-tile-description') : null;

  // Defensive: fallback to any h2, p
  if (!titleEl) {
    titleEl = rightCol.querySelector('h2');
  }
  if (!descEl) {
    descEl = rightCol.querySelector('p');
  }

  // Compose right cell content
  const rightCellContent = [];
  if (titleEl) rightCellContent.push(titleEl);
  if (descEl) rightCellContent.push(descEl);

  // Compose the table
  const headerRow = ['Columns block (columns21)'];
  const contentRow = [imgEl, rightCellContent]; // left, right

  // The block expects two columns in the second row
  const cells = [
    headerRow,
    [imgEl, rightCellContent],
  ];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
