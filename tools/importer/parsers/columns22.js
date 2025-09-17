/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main content and image columns
  // The structure is: element > grid-container-fluid > grid-container > xps-splitteaser > teaser > xps-teaser
  // Inside xps-teaser: .xps-teaser__content (left), .xps-teaser--media (right)
  const teaser = element.querySelector('.xps-teaser');
  if (!teaser) return;

  // Left column: content
  const leftContent = teaser.querySelector('.xps-teaser__content');
  // Right column: image/media
  const rightMedia = teaser.querySelector('.xps-teaser--media');

  // Defensive: If either column missing, fallback to children
  const leftCell = leftContent || teaser.children[0];
  const rightCell = rightMedia || teaser.children[1];

  // Table header
  const headerRow = ['Columns block (columns22)'];
  // Table columns row
  const columnsRow = [leftCell, rightCell];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
