/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns22)'];

  // Defensive: Find the main content and image columns
  // The structure is: .xps-teaser__content (left), .xps-teaser--media (right)
  let leftContent = null;
  let rightContent = null;

  // Find the .xps-teaser__content and .xps-teaser--media blocks
  const teaser = element.querySelector('.xps-teaser');
  if (teaser) {
    leftContent = teaser.querySelector('.xps-teaser__content');
    rightContent = teaser.querySelector('.xps-teaser--media');
  }

  // Defensive fallback: If not found, try direct children
  if (!leftContent || !rightContent) {
    const divs = element.querySelectorAll(':scope div');
    divs.forEach(div => {
      if (!leftContent && div.className && div.className.includes('xps-teaser__content')) leftContent = div;
      if (!rightContent && div.className && div.className.includes('xps-teaser--media')) rightContent = div;
    });
  }

  // If still not found, fallback to first/second child
  if (!leftContent || !rightContent) {
    const fallback = element.querySelectorAll(':scope > div > div > div > div > div');
    if (!leftContent && fallback.length > 0) leftContent = fallback[0];
    if (!rightContent && fallback.length > 1) rightContent = fallback[1];
  }

  // Defensive: If image is wrapped in aspect-ratio, get the actual img
  if (rightContent) {
    const aspect = rightContent.querySelector('.aspect-ratio');
    if (aspect) {
      const img = aspect.querySelector('img');
      if (img) {
        // Replace aspect container with img for cleaner output
        rightContent = img;
      }
    } else {
      // If rightContent is just an img
      const img = rightContent.querySelector('img');
      if (img) rightContent = img;
    }
  }

  // Build the row: left is content, right is image
  const row = [leftContent, rightContent];

  // Create table
  const cells = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
