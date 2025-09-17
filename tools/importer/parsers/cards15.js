/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process the selected tab panel (visible cards)
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find all product card columns inside the selected panel
  const cardCols = selectedPanel.querySelectorAll('.row > div');
  if (!cardCols.length) return;

  // Table header
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  cardCols.forEach((col) => {
    // Find the main card container
    const card = col.querySelector('.xps-product-card-hover');
    if (!card) return;

    // --- IMAGE CELL ---
    // Find the main product image (first img inside .xps-product-card-image-zoom-onhover)
    let imageCell = null;
    const imageContainer = card.querySelector('.xps-product-card-image-zoom-onhover');
    if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) imageCell = img;
    }

    // --- TEXT CELL ---
    // We'll build an array of elements for the text cell
    const textCellContent = [];
    const contentSection = card.querySelector('.xps-product-card-hover-content-section');
    if (contentSection) {
      // Title (h3)
      const titleSection = contentSection.querySelector('.xps-product-card-hover-content-title-section h3');
      if (titleSection) {
        // Reference, do not clone
        textCellContent.push(titleSection);
      }
      // Price (h3 in title section)
      const priceSection = contentSection.querySelector('.xps-product-card-hover-content-title-section .xps-product-card-hover-content-price-section h3');
      if (priceSection && priceSection !== titleSection) {
        textCellContent.push(priceSection);
      }
      // Tag/Label (Cold Extraction Enabled, etc)
      const labelSection = contentSection.querySelector('.xps-product-card-hover-content-product-label-section .xps-tag');
      if (labelSection) {
        textCellContent.push(labelSection);
      }
      // Description (p.xps-text-p3)
      const descSection = contentSection.querySelector('.xps-product-card-hover-content-description-section p');
      if (descSection) {
        textCellContent.push(descSection);
      }
      // Tablet price (p.xps-text-p2-bold)
      const tabletPriceSection = contentSection.querySelector('.xps-tablet-price-section p.xps-text-p2-bold');
      if (tabletPriceSection && tabletPriceSection.textContent !== priceSection?.textContent) {
        textCellContent.push(tabletPriceSection);
      }
      // Swatch picker (ul.xps-swatchpicker-container)
      const swatchPicker = contentSection.querySelector('.xps-swatchpicker-container');
      if (swatchPicker) {
        textCellContent.push(swatchPicker);
      }
    }

    // Defensive: If no image, use empty string
    if (!imageCell) imageCell = '';
    // Defensive: If no content, use empty string
    const textCell = textCellContent.length ? textCellContent : '';

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
