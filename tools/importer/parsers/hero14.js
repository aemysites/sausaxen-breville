/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get background image from aspect-ratio container
  function getBackgroundImageEl() {
    const imageContainer = element.querySelector('.xps-slide-show-card-content-image-container');
    if (!imageContainer) return null;
    const aspectRatio = imageContainer.querySelector('.aspect-ratio');
    if (!aspectRatio) return null;
    const img = aspectRatio.querySelector('img');
    return img || null;
  }

  // Helper to get the main content block WITHOUT the background image
  function getContentBlockEl() {
    // The main content is inside .xps-slide-show-card-content-typography
    const typography = element.querySelector('.xps-slide-show-card-content-typography');
    if (!typography) return null;
    // Remove image container if present
    const imgContainer = typography.querySelector('.xps-slide-show-card-content-image-container');
    if (imgContainer) imgContainer.remove();
    return typography;
  }

  // Compose table rows
  const headerRow = ['Hero (hero14)'];

  // Row 2: Background image (optional)
  const bgImgEl = getBackgroundImageEl();
  const imageRow = [bgImgEl ? bgImgEl : ''];

  // Row 3: Content block (title, subtitle, CTA, etc)
  const contentBlockEl = getContentBlockEl();
  const contentRow = [contentBlockEl ? contentBlockEl : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
