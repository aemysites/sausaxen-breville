/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero26)'];

  // --- Background Asset (row 2) ---
  let backgroundAsset = '';
  const bgContainer = element.querySelector('.xps-herobanner-background-container');
  if (bgContainer) {
    const video = bgContainer.querySelector('video');
    if (video && video.src) {
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = video.src;
      backgroundAsset = videoLink;
    } else {
      const img = bgContainer.querySelector('img');
      if (img) backgroundAsset = img;
    }
  }

  // --- Content (row 3) ---
  let contentCell = '';
  const contentGrid = element.querySelector('.xps-herobanner-content-grid');
  if (contentGrid) {
    const contentContainer = contentGrid.querySelector('.xps-herobanner-content-container');
    if (contentContainer) {
      // Collect all content as a single block for flexibility
      const cellContent = document.createElement('div');
      // Title
      const title = contentContainer.querySelector('h1');
      if (title) cellContent.appendChild(title.cloneNode(true));
      // Subheading
      const subheading = contentContainer.querySelector('.xps-text-p1');
      if (subheading) cellContent.appendChild(subheading.cloneNode(true));
      // CTA buttons
      const ctaWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
      if (ctaWrapper) {
        Array.from(ctaWrapper.children).forEach((cta) => {
          cellContent.appendChild(cta.cloneNode(true));
        });
      }
      // Only use if we actually found content
      if (cellContent.childNodes.length > 0) {
        contentCell = cellContent;
      }
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [backgroundAsset],
    [contentCell],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
