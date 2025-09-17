/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main splitteaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // The teaser contains two main children: media (left), content (right)
  const teaser = splitTeaser.querySelector('.teaser');
  if (!teaser) return;

  // Left column: media
  let leftCol = teaser.querySelector('.xps-teaser--media');
  // Defensive: fallback to first child if not found
  if (!leftCol) leftCol = teaser.children[0];

  // Right column: content
  let rightCol = teaser.querySelector('.xps-teaser__content');
  if (!rightCol) rightCol = teaser.children[1];

  // Table header row
  const headerRow = ['Columns block (columns23)'];

  // Table content row: two columns (media, content)
  // Always reference existing elements, do not clone
  const contentRow = [leftCol, rightCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
