/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate child by class from parent
  function getChildByClass(parent, className) {
    return Array.from(parent.children).find(child => child.classList.contains(className));
  }

  // 1. Header row
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row
  let bgImgEl = null;
  // Find background image container
  const bgContainer = getChildByClass(element, 'xps-herobanner-background-container');
  if (bgContainer) {
    const bgImgWrap = getChildByClass(bgContainer, 'xps-herobanner-background-image');
    if (bgImgWrap) {
      // Find first img inside
      const img = bgImgWrap.querySelector('img');
      if (img) bgImgEl = img;
    }
  }
  const bgImgRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content row
  let contentEls = [];
  // Find main content grid
  const contentGrid = element.querySelector('.xps-herobanner-content-grid');
  if (contentGrid) {
    // Find the content container inside grid
    const col = contentGrid.querySelector('.col-lg-8, .col-md-12, .col-sm-12');
    if (col) {
      const contentContainer = col.querySelector('.xps-herobanner-content-container');
      if (contentContainer) {
        // Find the tile
        const tile = contentContainer.querySelector('.xps-card-tile');
        if (tile) {
          // Heading
          const heading = tile.querySelector('h2');
          if (heading) contentEls.push(heading);
          // Description (may be div or p)
          const descDiv = tile.querySelector('.xps-card-tile-description');
          if (descDiv) contentEls.push(descDiv);
          // CTA buttons
          const btnWrapper = tile.querySelector('.xps-card-tile-button-wrapper');
          if (btnWrapper) {
            // Only include if it has links
            const links = btnWrapper.querySelectorAll('a');
            if (links.length > 0) {
              contentEls.push(btnWrapper);
            }
          }
        }
      }
    }
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
