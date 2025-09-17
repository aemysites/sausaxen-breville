/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process the selected tab panel with product cards
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the grid container with product card columns
  const grid = selectedPanel.querySelector('.grid-container');
  if (!grid) return;

  // Get all card columns
  const cardCols = grid.querySelectorAll('.row > div');
  if (!cardCols.length) return;

  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  cardCols.forEach((col) => {
    // Defensive: find the card wrapper
    const card = col.querySelector('.xps-product-card-hover');
    if (!card) return;

    // --- IMAGE CELL ---
    let imageCell = null;
    // Find main product image (first img inside .xps-product-card-image-zoom-onhover)
    const imgWrap = card.querySelector('.xps-product-card-image-zoom-onhover');
    if (imgWrap) {
      const img = imgWrap.querySelector('img');
      if (img) imageCell = img;
    }

    // --- TEXT CELL ---
    // We'll collect title, price, label, description, swatches
    const textCellContent = [];
    const contentSection = card.querySelector('.xps-product-card-hover-content-section');
    if (contentSection) {
      // Title and price (h3)
      const titleSection = contentSection.querySelector('.xps-product-card-hover-content-title-section');
      if (titleSection) {
        // Title
        const title = titleSection.querySelector('h3.xps-text-h6');
        if (title) {
          // Use a <strong> for semantic heading in block
          const strong = document.createElement('strong');
          strong.textContent = title.textContent.trim();
          textCellContent.push(strong);
        }
        // Price (h3)
        const price = titleSection.querySelector('.xps-product-card-hover-content-price-section h3');
        if (price) {
          // Add price as plain text
          const priceSpan = document.createElement('span');
          priceSpan.textContent = ' ' + price.textContent.trim();
          textCellContent.push(priceSpan);
        }
      }
      // Product label (optional)
      const labelSection = contentSection.querySelector('.xps-product-card-hover-content-product-label-section');
      if (labelSection) {
        const labelTag = labelSection.querySelector('.xps-tag');
        if (labelTag) {
          textCellContent.push(labelTag);
        }
      }
      // Description
      const descSection = contentSection.querySelector('.xps-product-card-hover-content-description-section');
      if (descSection) {
        const desc = descSection.querySelector('p');
        if (desc) {
          textCellContent.push(desc);
        }
      }
      // Tablet price (optional, skip if already added)
      // Swatch picker
      const swatchSection = contentSection.querySelector('.xps-product-card-hover-content-swatch-picker-container');
      if (swatchSection) {
        const swatchList = swatchSection.querySelector('ul.xps-swatchpicker-container');
        if (swatchList) {
          textCellContent.push(swatchList);
        }
      }
    }

    rows.push([
      imageCell,
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
