/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the selected tab panel containing the cards
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the grid container inside the selected panel
  const gridContainer = selectedPanel.querySelector('.grid-container');
  if (!gridContainer) return;

  // Find all card columns (each card is inside a col-... div)
  const cardColumns = gridContainer.querySelectorAll('.row > div');
  if (!cardColumns.length) return;

  // Header row must match block name exactly
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  cardColumns.forEach((col) => {
    // Defensive: find the card wrapper
    const card = col.querySelector('.xps-product-card-hover');
    if (!card) return;

    // --- IMAGE CELL ---
    let imageCell = null;
    const img = card.querySelector('.xps-product-card-hover-media-section img');
    if (img) {
      imageCell = img;
    } else {
      // fallback: try to find any image
      const fallbackImg = card.querySelector('img');
      if (fallbackImg) imageCell = fallbackImg;
    }

    // --- TEXT CELL ---
    const textContent = document.createElement('div');
    // Title
    const titleSection = card.querySelector('.xps-product-card-hover-content-title-section h3');
    if (titleSection) {
      textContent.appendChild(titleSection);
    }
    // Price (first price, not the tablet duplicate)
    const priceSection = card.querySelector('.xps-product-card-hover-content-title-section .xps-product-card-hover-content-price-section h3');
    if (priceSection && priceSection !== titleSection) {
      textContent.appendChild(priceSection);
    }
    // Product label (if present)
    const labelSection = card.querySelector('.xps-product-card-hover-content-product-label-section');
    if (labelSection) {
      textContent.appendChild(labelSection);
    }
    // Description
    const descSection = card.querySelector('.xps-product-card-hover-content-description-section p');
    if (descSection) {
      textContent.appendChild(descSection);
    }
    // Swatch picker (color dots)
    const swatchPicker = card.querySelector('.xps-product-card-hover-content-swatch-picker-container ul.xps-swatchpicker-container');
    if (swatchPicker) {
      textContent.appendChild(swatchPicker);
    }

    rows.push([imageCell, textContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
