/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process the selected tab panel with product cards
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the row containing the product cards
  const row = selectedPanel.querySelector('.row');
  if (!row) return;

  // Get all card columns (each card is a col-*)
  const cardCols = Array.from(row.children).filter(col => col.className && col.className.match(/col-/));

  // Table header
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  cardCols.forEach(col => {
    // Each card is inside .xps-product-card-hover
    const card = col.querySelector('.xps-product-card-hover');
    if (!card) return;

    // --- IMAGE CELL ---
    // Find the main product image (first img inside .xps-product-card-image-zoom-onhover)
    let img = card.querySelector('.xps-product-card-image-zoom-onhover img');
    // Defensive: fallback to first img in card if not found
    if (!img) img = card.querySelector('img');

    // --- TEXT CELL ---
    const textContent = document.createElement('div');
    // Title (h3 inside .xps-product-card-hover-content-title-section)
    const titleSection = card.querySelector('.xps-product-card-hover-content-title-section');
    if (titleSection) {
      const title = titleSection.querySelector('h3');
      if (title) textContent.appendChild(title);
      // Price (h3 in same section)
      const price = titleSection.querySelector('.xps-product-card-hover-content-price-section h3');
      if (price) textContent.appendChild(price);
    }
    // Product label (optional, .xps-product-card-hover-content-product-label-section)
    const labelSection = card.querySelector('.xps-product-card-hover-content-product-label-section');
    if (labelSection) {
      textContent.appendChild(labelSection);
    }
    // Description (p inside .xps-product-card-hover-content-description-section)
    const descSection = card.querySelector('.xps-product-card-hover-content-description-section');
    if (descSection) {
      const desc = descSection.querySelector('p');
      if (desc) textContent.appendChild(desc);
    }
    // Tablet price (optional, p.xps-text-p2-bold)
    const tabletPriceSection = card.querySelector('.xps-tablet-price-section');
    if (tabletPriceSection) {
      const tabletPrice = tabletPriceSection.querySelector('p');
      if (tabletPrice) textContent.appendChild(tabletPrice);
    }
    // Swatch picker (optional)
    const swatchPicker = card.querySelector('.xps-product-card-hover-content-swatch-picker-container');
    if (swatchPicker) {
      // Only include the color swatches list, not the aria-live div
      const swatchList = swatchPicker.querySelector('ul');
      if (swatchList) textContent.appendChild(swatchList);
    }

    // Add the row: [image, textContent]
    rows.push([img, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
