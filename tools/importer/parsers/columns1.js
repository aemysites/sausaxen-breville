/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns block (columns1)'];

  // Defensive: Find the left and right column containers
  // Left: image/media
  // Right: content (title, description, button)
  let leftCol, rightCol;

  // The structure is: element > .grid-container-fluid > .grid-container > .xps-splitteaser > .teaser > .xps-teaser.left.width-50.center
  // Inside .xps-teaser: .xps-teaser--media (left), .xps-teaser__content (right)
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (splitTeaser) {
    const teaser = splitTeaser.querySelector('.teaser .xps-teaser');
    if (teaser) {
      leftCol = teaser.querySelector('.xps-teaser--media');
      rightCol = teaser.querySelector('.xps-teaser__content');
    }
  }

  // Defensive fallback: if not found, try direct children
  if (!leftCol || !rightCol) {
    const divs = element.querySelectorAll(':scope div');
    leftCol = leftCol || divs[0];
    rightCol = rightCol || divs[1];
  }

  // Compose the columns row
  const columnsRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, columnsRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
