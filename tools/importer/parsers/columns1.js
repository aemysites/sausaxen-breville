/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const gridContainer = element.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find the split teaser (contains both columns)
  const splitTeaser = gridContainer.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Left column: image/media
  const leftMedia = splitTeaser.querySelector('.xps-teaser--media');
  // Right column: content
  const rightContent = splitTeaser.querySelector('.xps-teaser__content');
  if (!leftMedia || !rightContent) return;

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns1)'];
  // Table columns: left (image), right (content)
  const columnsRow = [leftMedia, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
