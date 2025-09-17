/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info
  function extractCard(cardEl) {
    // Image: find first img inside the card
    let img = cardEl.querySelector('img');
    // Defensive: fallback to null if not found
    if (!img) img = document.createElement('span');

    // Text cell content
    const contentSection = cardEl.querySelector('.xps-product-card-hover-content-section');
    let textCellContent = [];
    if (contentSection) {
      // Title (h3)
      const titleSection = contentSection.querySelector('.xps-product-card-hover-content-title-section');
      let title = titleSection ? titleSection.querySelector('h3') : null;
      if (title) textCellContent.push(title);

      // Price (h3 in title section)
      let price = titleSection ? titleSection.querySelector('.xps-product-card-hover-content-price-section h3') : null;
      if (price) {
        // Only add price if not already in title
        if (!title || !title.textContent.includes(price.textContent)) {
          textCellContent.push(price);
        }
      }
      // Description (p)
      const descSection = contentSection.querySelector('.xps-product-card-hover-content-description-section');
      let desc = descSection ? descSection.querySelector('p') : null;
      if (desc) textCellContent.push(desc);

      // Tablet price (p2-bold)
      const tabletPriceSection = contentSection.querySelector('.xps-tablet-price-section');
      let tabletPrice = tabletPriceSection ? tabletPriceSection.querySelector('p') : null;
      if (tabletPrice && (!price || tabletPrice.textContent !== price.textContent)) {
        textCellContent.push(tabletPrice);
      }

      // Swatches (ul.xps-swatchpicker-container)
      const swatchContainer = contentSection.querySelector('ul.xps-swatchpicker-container');
      if (swatchContainer) {
        // Only include swatches if there are any
        textCellContent.push(swatchContainer);
      }
    }
    // Defensive: if nothing found, fallback to cardEl text
    if (textCellContent.length === 0) {
      textCellContent.push(document.createTextNode(cardEl.textContent.trim()));
    }
    return [img, textCellContent];
  }

  // Get all cards (direct children)
  const cards = Array.from(element.querySelectorAll(':scope > .xps-product-card-hover'));

  // Build table rows
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  cards.forEach(cardEl => {
    rows.push(extractCard(cardEl));
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
