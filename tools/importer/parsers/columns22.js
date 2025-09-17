/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main content and image columns
  // The structure is: left column (text + button), right column (image)
  // We'll find both by traversing immediate children

  // Find the main teaser block (contains both columns)
  const teaser = element.querySelector('.xps-teaser');
  if (!teaser) return;

  // Left column: content
  const content = teaser.querySelector('.xps-teaser__content');
  // Defensive: If not found, fallback to first child
  const leftCol = content || teaser.children[0];

  // Right column: image
  const media = teaser.querySelector('.xps-teaser--media');
  let rightCol = null;
  if (media) {
    // Find the image inside aspect-ratio container
    const img = media.querySelector('img');
    if (img) {
      rightCol = img;
    } else {
      // If no image, fallback to media block
      rightCol = media;
    }
  }

  // Table header
  const headerRow = ['Columns block (columns22)'];

  // Table content row (two columns)
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
