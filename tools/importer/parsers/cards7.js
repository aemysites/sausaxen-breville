/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct product card elements (not nested)
  const cards = Array.from(element.querySelectorAll(':scope > .xps-product-card-hover'));

  // Table header row as required by block spec
  const headerRow = ['Cards (cards7)'];

  // Build each card row
  const rows = cards.map(card => {
    // --- IMAGE ---
    // Find the image inside the card
    let img = card.querySelector('.xps-product-card-hover-media-section img');
    if (!img) img = card.querySelector('img'); // fallback

    // --- TEXT CONTENT ---
    // Title (h3)
    let title = card.querySelector('.xps-product-card-hover-content-title-section h3');
    if (!title) title = card.querySelector('h3');

    // Price: prefer bold price (tablet), fallback to price in title section
    let price = card.querySelector('.xps-tablet-price-section p');
    if (!price) {
      let priceSection = card.querySelector('.xps-product-card-hover-content-title-section .xps-product-card-hover-content-price-section h3');
      if (priceSection) price = priceSection;
    }

    // Description
    let desc = card.querySelector('.xps-product-card-hover-content-description-section p');

    // Swatches (optional)
    let swatchContainer = card.querySelector('.xps-product-card-hover-content-swatch-picker-container .xps-swatchpicker-container');
    let swatches = [];
    if (swatchContainer) {
      swatches = Array.from(swatchContainer.querySelectorAll('li'));
    }

    // Compose the text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (price) textCell.push(price);
    if (desc) textCell.push(desc);
    if (swatches.length > 0) textCell.push(...swatches);
    if (textCell.length === 0) textCell.push(document.createTextNode(''));

    // Compose row: [image, text content]
    return [img, textCell];
  });

  // Final table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
