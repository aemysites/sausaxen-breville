/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Get all product cards (direct children)
  const cards = element.querySelectorAll(':scope > .xps-product-card-hover');

  cards.forEach((card) => {
    // --- IMAGE COLUMN ---
    // Find the main product image (first img inside media section)
    let img = card.querySelector('.xps-product-card-hover-media-section img');
    // Defensive: fallback to any img if not found
    if (!img) img = card.querySelector('img');

    // --- TEXT COLUMN ---
    const textContent = [];

    // Title (h3 inside title section)
    const titleSection = card.querySelector('.xps-product-card-hover-content-title-section');
    if (titleSection) {
      const title = titleSection.querySelector('h3');
      if (title) textContent.push(title);
    }

    // Price (h3 inside title section, usually second h3)
    if (titleSection) {
      const price = titleSection.querySelectorAll('h3')[1];
      if (price) textContent.push(price);
    }

    // Description (p inside description section)
    const descSection = card.querySelector('.xps-product-card-hover-content-description-section');
    if (descSection) {
      const desc = descSection.querySelector('p');
      if (desc) textContent.push(desc);
    }

    // Tablet price (p inside tablet price section, only if not already included)
    const tabletPriceSection = card.querySelector('.xps-tablet-price-section');
    if (tabletPriceSection) {
      const tabletPrice = tabletPriceSection.querySelector('p');
      // Only add if not already present
      if (tabletPrice && (!textContent.some(e => e.textContent === tabletPrice.textContent))) {
        textContent.push(tabletPrice);
      }
    }

    // Swatch picker (color options)
    const swatchContainer = card.querySelector('.xps-product-card-hover-content-swatch-picker-container .xps-swatchpicker-container');
    if (swatchContainer) {
      // Include the entire swatch UL for resilience
      textContent.push(swatchContainer);
    }

    // Compose the row: [image, textContent]
    // Defensive: if no image, use empty string
    rows.push([
      img || '',
      textContent.length ? textContent : ''
    ]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
