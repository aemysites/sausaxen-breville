/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row must match target block name exactly
  const headerRow = ['Hero (hero4)'];

  // --- Background Image Row ---
  // Find the background image <img> inside the hero banner
  let bgImgElem = null;
  const bgImgContainer = element.querySelector('.xps-herobanner-background-image');
  if (bgImgContainer) {
    bgImgElem = bgImgContainer.querySelector('img');
  }

  // --- Content Row ---
  // Find the main content container
  let contentElems = [];
  const contentContainer = element.querySelector('.xps-herobanner-content-container');
  if (contentContainer) {
    // Title (h2)
    const title = contentContainer.querySelector('h2');
    if (title) contentElems.push(title);

    // Description (p inside .xps-card-tile-description)
    const descWrapper = contentContainer.querySelector('.xps-card-tile-description');
    if (descWrapper) {
      const paragraphs = descWrapper.querySelectorAll('p');
      paragraphs.forEach(p => contentElems.push(p));
    }

    // CTA Buttons (<a> inside .xps-card-tile-button-wrapper)
    const btnWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
    if (btnWrapper) {
      const btns = Array.from(btnWrapper.querySelectorAll('a'));
      btns.forEach(btn => contentElems.push(btn));
    }
  }

  // Compose table rows as per block spec
  const tableRows = [
    headerRow,
    [bgImgElem ? bgImgElem : ''],
    [contentElems.length ? contentElems : ''],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
