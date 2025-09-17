/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content and image sections
  // The structure is deeply nested, so we want to reference the main content and image blocks directly.

  // 1. Find the content area (title, description, CTA)
  let contentArea;
  let imageArea;

  // Find the .xps-teaser__content (text + CTA)
  contentArea = element.querySelector('.xps-teaser__content');
  // Find the image area
  imageArea = element.querySelector('.xps-teaser--media img');

  // Defensive fallback if selectors fail
  if (!contentArea) {
    contentArea = element.querySelector('[class*="card-tile-content-left"]');
  }
  if (!imageArea) {
    // Try to find any img in the block
    imageArea = element.querySelector('img');
  }

  // 2. Table header
  const headerRow = ['Hero (hero24)'];

  // 3. Table rows
  // Row 2: Image (background/decorative)
  const imageRow = [imageArea ? imageArea : ''];

  // Row 3: Content (title, description, CTA)
  // We'll reference the entire contentArea block for resilience
  const contentRow = [contentArea ? contentArea : ''];

  // 4. Build table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the block table
  element.replaceWith(block);
}
