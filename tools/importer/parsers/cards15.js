/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the selected tab panel (the visible one)
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the grid container (cards are inside)
  const grid = selectedPanel.querySelector('.grid-container');
  if (!grid) return;

  // Find the row containing the cards
  const row = grid.querySelector('.row');
  if (!row) return;

  // Find all card columns (each card)
  const cardCols = getImmediateChildren(row, 'div');

  // Prepare table rows
  const rows = [];
  // Header row as per requirements
  rows.push(['Cards (cards15)']);

  cardCols.forEach(col => {
    // Defensive: look for card wrapper
    const card = col.querySelector('.xps-product-card-hover');
    if (!card) return;

    // --- IMAGE CELL ---
    let imageCell = '';
    // Find the main image in the card
    const mainImg = card.querySelector('.xps-product-card-hover-media-section img');
    if (mainImg) {
      imageCell = mainImg;
    }

    // --- TEXT CELL ---
    // We'll collect all relevant content into a fragment
    const textFrag = document.createDocumentFragment();
    // Title (as heading)
    const titleSection = card.querySelector('.xps-product-card-hover-content-title-section');
    if (titleSection) {
      // The title is in an h3 inside titleSection
      const title = titleSection.querySelector('h3');
      if (title) textFrag.appendChild(title);
      // The price is in another h3 in the same section (usually second h3)
      // We'll append it after the title
      const price = titleSection.querySelectorAll('h3')[1];
      if (price) textFrag.appendChild(price);
    }
    // Product label (optional)
    const labelSection = card.querySelector('.xps-product-card-hover-content-product-label-section');
    if (labelSection) {
      // This is usually a div with a span inside
      textFrag.appendChild(labelSection);
    }
    // Description
    const descSection = card.querySelector('.xps-product-card-hover-content-description-section');
    if (descSection) {
      textFrag.appendChild(descSection);
    }
    // Tablet price (optional, can be duplicate)
    const tabletPrice = card.querySelector('.xps-tablet-price-section');
    if (tabletPrice && !textFrag.contains(tabletPrice)) {
      textFrag.appendChild(tabletPrice);
    }
    // Swatch picker (color dots)
    const swatchSection = card.querySelector('.xps-product-card-hover-content-swatch-picker-container');
    if (swatchSection) {
      textFrag.appendChild(swatchSection);
    }

    rows.push([imageCell, textFrag]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
