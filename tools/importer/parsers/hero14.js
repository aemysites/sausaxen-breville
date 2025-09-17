/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the background image (if present)
  function getBackgroundImage() {
    // The main hero image is typically a background or inside the first aspect-ratio div
    const aspectDiv = element.querySelector('.xps-slide-show-card-content-image-container .aspect-ratio');
    if (aspectDiv) {
      // Try to find an img inside
      const img = aspectDiv.querySelector('img');
      if (img) return img;
    }
    // If no img, try to find a background-image style
    if (aspectDiv && aspectDiv.style.backgroundImage) {
      const urlMatch = aspectDiv.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if (urlMatch && urlMatch[1]) {
        const img = document.createElement('img');
        img.src = urlMatch[1];
        return img;
      }
    }
    return '';
  }

  // Helper to get the content (headings, subheading, CTA)
  function getContentBlock() {
    const typography = element.querySelector('.xps-slide-show-card-content-typography');
    if (!typography) return '';
    const fragment = document.createDocumentFragment();
    // Subheading (Popular Recipes)
    const subheading = typography.querySelector('.xps-text-p3');
    if (subheading) fragment.appendChild(subheading);
    // Title (h3)
    const title = typography.querySelector('h3');
    if (title) fragment.appendChild(title);
    // Circle card (Tailored for...)
    const circleCard = typography.querySelector('.xps-circle-card');
    if (circleCard) fragment.appendChild(circleCard);
    // Description (paragraph)
    const desc = typography.querySelector('.xps-card-tile-description');
    if (desc) fragment.appendChild(desc);
    // CTA button
    const cta = typography.querySelector('.xps-card-tile-button-wrapper');
    if (cta) fragment.appendChild(cta);
    return fragment.childNodes.length ? fragment : '';
  }

  // Table header
  const headerRow = ['Hero (hero14)'];
  // Second row: background image (optional)
  const bgImg = getBackgroundImage();
  const bgRow = [bgImg ? bgImg : ''];
  // Third row: content block
  const contentBlock = getContentBlock();
  const contentRow = [contentBlock ? contentBlock : ''];
  const cells = [headerRow, bgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
