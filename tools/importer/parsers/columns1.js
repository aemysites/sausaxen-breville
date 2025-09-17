/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the left and right column containers
  // Left: image/media
  // Right: content (title, description, button)
  const leftCol = element.querySelector('.xps-teaser--media');
  const rightCol = element.querySelector('.xps-teaser__content');

  // Defensive fallback: If not found, try to get first/second child of .xps-teaser
  let leftContent = leftCol;
  let rightContent = rightCol;
  if (!leftContent || !rightContent) {
    const teaser = element.querySelector('.xps-teaser');
    if (teaser) {
      const teaserChildren = teaser.children;
      leftContent = leftContent || teaserChildren[0];
      rightContent = rightContent || teaserChildren[1];
    }
  }

  // Table header row
  const headerRow = ['Columns block (columns1)'];

  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
