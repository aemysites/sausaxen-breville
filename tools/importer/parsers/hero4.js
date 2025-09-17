/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child by class
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row
  // Find .xps-herobanner-background-image > img
  let bgImgEl = null;
  const bgContainer = element.querySelector('.xps-herobanner-background-image');
  if (bgContainer) {
    bgImgEl = bgContainer.querySelector('img');
  }
  const bgRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row
  // Find the main content container
  let contentContainer = element.querySelector('.xps-herobanner-content-container');
  if (!contentContainer) {
    // fallback: try to find .xps-card-tile
    contentContainer = element.querySelector('.xps-card-tile');
  }
  let contentElements = [];
  if (contentContainer) {
    // Find title (h2), description (div.xps-card-tile-description), and CTA buttons
    const title = contentContainer.querySelector('h2, h1, h3');
    if (title) contentElements.push(title);
    const desc = contentContainer.querySelector('.xps-card-tile-description');
    if (desc) contentElements.push(desc);
    // CTA buttons: all <a> in .xps-card-tile-button-wrapper
    const btnWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
    if (btnWrapper) {
      const btns = Array.from(btnWrapper.querySelectorAll('a'));
      if (btns.length > 0) {
        contentElements.push(...btns);
      }
    }
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // Build table
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
