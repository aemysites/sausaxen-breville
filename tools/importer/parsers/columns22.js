/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main split teaser content and image
  // The structure is deeply nested, so we look for the left (content) and right (image) columns

  // Get the main teaser content (left column)
  let leftContent;
  let rightContent;

  // Find the main content area (text, heading, button)
  const teaserContent = element.querySelector('.xps-teaser__content');
  if (teaserContent) {
    leftContent = teaserContent;
  } else {
    // fallback: use first column-like div
    leftContent = element.querySelector('.xps-card-tile') || element;
  }

  // Find the image area (right column)
  const media = element.querySelector('.xps-teaser--media');
  if (media) {
    // Just the image itself
    const img = media.querySelector('img');
    rightContent = img ? img : media;
  } else {
    // fallback: find first image
    const img = element.querySelector('img');
    rightContent = img || null;
  }

  // Table header
  const headerRow = ['Columns block (columns22)'];
  // Table content row: two columns, left (text/button), right (image)
  const contentRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
