/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main split teaser columns
  const columns = [];

  // Find the left and right column wrappers
  // The left column contains the image (inside .xps-teaser--media)
  // The right column contains the text and button (inside .xps-teaser__content)
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Left column: image
  let leftCol = null;
  const leftTeaser = splitTeaser.querySelector('.xps-teaser.left');
  if (leftTeaser) {
    const media = leftTeaser.querySelector('.xps-teaser--media');
    if (media) {
      leftCol = media;
    }
  }

  // Right column: content (title, description, button)
  let rightCol = null;
  if (leftTeaser) {
    const content = leftTeaser.querySelector('.xps-teaser__content');
    if (content) {
      rightCol = content;
    }
  }

  // Build the columns row
  const row = [];
  if (leftCol) row.push(leftCol);
  if (rightCol) row.push(rightCol);

  // Only build if at least one column found
  if (row.length === 0) return;

  const cells = [
    ['Columns block (columns1)'], // Header row
    row // Columns row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
