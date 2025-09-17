/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if the main grid is present
  const panel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!panel) return;

  // Find the grid container with product cards
  const grid = panel.querySelector('.grid-container');
  if (!grid) return;

  // Get all product card columns (each is a card)
  const cardCols = grid.querySelectorAll('.row > div');
  if (!cardCols.length) return;

  // Table header
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // For each card, extract image and content
  cardCols.forEach((col) => {
    const card = col.querySelector('.xps-product-card-hover');
    if (!card) return;

    // --- IMAGE CELL ---
    let imageCell = null;
    const img = card.querySelector('.xps-product-card-image-zoom-onhover img');
    if (img) {
      imageCell = img;
    }

    // --- TEXT CELL ---
    const contentSection = card.querySelector('.xps-product-card-hover-content-section');
    const textCellParts = [];
    if (contentSection) {
      // Title & price
      const titleSection = contentSection.querySelector('.xps-product-card-hover-content-title-section');
      if (titleSection) {
        // Title
        const title = titleSection.querySelector('h3.xps-text-h6');
        if (title) textCellParts.push(title);
        // Price (first one)
        const price = titleSection.querySelector('.xps-product-card-hover-content-price-section h3.xps-text-h6');
        if (price) textCellParts.push(price);
      }
      // Product label (optional)
      const labelSection = contentSection.querySelector('.xps-product-card-hover-content-product-label-section');
      if (labelSection) {
        const label = labelSection.querySelector('.xps-tag');
        if (label) textCellParts.push(label);
      }
      // Description
      const descSection = contentSection.querySelector('.xps-product-card-hover-content-description-section p');
      if (descSection) textCellParts.push(descSection);
      // Tablet price (optional, but usually duplicate)
      // Swatch picker (color dots)
      const swatchContainer = contentSection.querySelector('.xps-product-card-hover-content-swatch-picker-container .xps-swatchpicker-container');
      if (swatchContainer) textCellParts.push(swatchContainer);
    }

    // Compose row
    rows.push([
      imageCell,
      textCellParts
    ]);
  });

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
