/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all immediate product card elements
  const cardEls = Array.from(element.querySelectorAll(':scope > .xps-product-card-hover'));
  const rows = [];
  // Always use the block name as header
  const headerRow = ['Cards (cards7)'];
  rows.push(headerRow);

  cardEls.forEach((cardEl) => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    let imgEl = cardEl.querySelector('.xps-product-card-hover-media-section img');
    // Defensive: fallback to first img if not found
    if (!imgEl) imgEl = cardEl.querySelector('img');

    // --- TEXT CELL ---
    // Title (h3)
    let titleEl = cardEl.querySelector('.xps-product-card-hover-content-title-section h3');
    // Defensive: fallback to first h3
    if (!titleEl) titleEl = cardEl.querySelector('h3');
    // Price (h3 or p)
    let priceEl = cardEl.querySelector('.xps-product-card-hover-content-title-section .xps-product-card-hover-content-price-section h3');
    if (!priceEl) priceEl = cardEl.querySelector('.xps-product-card-hover-content-price-section.xps-tablet-price-section p');
    // Description (p)
    let descEl = cardEl.querySelector('.xps-product-card-hover-content-description-section p');
    // Swatch picker (ul)
    let swatchUl = cardEl.querySelector('.xps-product-card-hover-content-swatch-picker-container ul');

    // Compose text cell content
    const textContent = [];
    if (titleEl) textContent.push(titleEl);
    if (priceEl) textContent.push(priceEl);
    if (descEl) textContent.push(descEl);
    if (swatchUl) textContent.push(swatchUl);

    // Defensive: if no title/price/desc, fallback to all text
    if (textContent.length === 0) {
      // Grab all text nodes
      Array.from(cardEl.querySelectorAll('h3, p')).forEach((el) => textContent.push(el));
    }

    // --- ROW ---
    rows.push([
      imgEl,
      textContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
