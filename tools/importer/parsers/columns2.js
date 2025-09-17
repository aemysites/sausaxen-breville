/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Columns block (columns2)'];

  // Defensive: find the two main columns (content left, media right)
  // The structure is deeply nested, but the two main columns are:
  // - Left: .xps-card-tile-content-left (contains heading, description, button)
  // - Right: .xps-teaser--media (contains video)

  let leftCol, rightCol;
  // Find left column
  leftCol = element.querySelector('.xps-card-tile-content-left');
  // Find right column
  rightCol = element.querySelector('.xps-teaser--media');

  // Defensive fallback: if not found, try to get first/second child of .xps-teaser
  if (!leftCol || !rightCol) {
    const teaser = element.querySelector('.xps-teaser');
    if (teaser) {
      const children = Array.from(teaser.children);
      leftCol = leftCol || children.find(el => el.classList.contains('xps-teaser__content'));
      rightCol = rightCol || children.find(el => el.classList.contains('xps-teaser--media'));
    }
  }

  // Defensive: if still missing, fallback to first/second child div
  if (!leftCol || !rightCol) {
    const divs = element.querySelectorAll(':scope div');
    leftCol = leftCol || divs[0];
    rightCol = rightCol || divs[1];
  }

  // Build the columns row
  const columnsRow = [leftCol, rightCol];

  // Compose the table cells
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
