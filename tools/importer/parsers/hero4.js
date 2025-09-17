/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element is present
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row
  let bgImgEl = null;
  // Find the background image (img inside .xps-herobanner-background-image)
  const bgImgContainer = element.querySelector('.xps-herobanner-background-image');
  if (bgImgContainer) {
    const img = bgImgContainer.querySelector('img');
    if (img) {
      bgImgEl = img;
    }
  }
  const bgImgRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row
  // Find the content container
  let contentEls = [];
  const contentContainer = element.querySelector('.xps-herobanner-content-container');
  if (contentContainer) {
    // Title (h2)
    const title = contentContainer.querySelector('h2');
    if (title) contentEls.push(title);
    // Description (p)
    const descDiv = contentContainer.querySelector('.xps-card-tile-description');
    if (descDiv) {
      const p = descDiv.querySelector('p');
      if (p) contentEls.push(p);
    }
    // CTA buttons (a)
    const btnWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
    if (btnWrapper) {
      // Only include actual <a> elements
      const links = Array.from(btnWrapper.querySelectorAll('a'));
      if (links.length > 0) {
        contentEls = contentEls.concat(links);
      }
    }
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // Compose table rows
  const cells = [headerRow, bgImgRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
