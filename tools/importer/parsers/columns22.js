/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main content and image columns
  // The structure is: left column (content), right column (image)

  // Find the immediate content wrapper (left column)
  let leftContent = null;
  let rightContent = null;

  // Look for the .xps-teaser__content (left) and .xps-teaser--media (right)
  const teaser = element.querySelector('.xps-teaser');
  if (teaser) {
    leftContent = teaser.querySelector('.xps-teaser__content');
    rightContent = teaser.querySelector('.xps-teaser--media');
  }

  // Fallbacks if structure changes
  if (!leftContent) {
    // Try to find a content block with h2 and description
    leftContent = element.querySelector('.xps-card-tile-content-left');
  }
  if (!rightContent) {
    // Try to find an image inside the block
    const imgWrap = element.querySelector('.aspect-ratio');
    if (imgWrap) {
      rightContent = imgWrap;
    } else {
      // Try to find any image
      const img = element.querySelector('img');
      if (img) {
        rightContent = img;
      }
    }
  }

  // Build the table rows
  const headerRow = ['Columns block (columns22)'];
  const columnsRow = [leftContent, rightContent];

  // Create the block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
