/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card image
  function getCardImage(card) {
    // Find the first img inside the card
    const img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract card text content (title, price, description, swatches)
  function getCardText(card) {
    const contentSection = card.querySelector('.xps-product-card-hover-content-section');
    if (!contentSection) return document.createElement('div');
    const frag = document.createDocumentFragment();

    // Title & price (h3)
    const titleSection = contentSection.querySelector('.xps-product-card-hover-content-title-section');
    if (titleSection) {
      // Title
      const title = titleSection.querySelector('h3');
      if (title) frag.appendChild(title);
      // Price (h3)
      const price = titleSection.querySelector('.xps-product-card-hover-content-price-section h3');
      if (price) {
        // Only add price if it's not a duplicate of below (p)
        frag.appendChild(price);
      }
    }

    // Description
    const descSection = contentSection.querySelector('.xps-product-card-hover-content-description-section');
    if (descSection) {
      const desc = descSection.querySelector('p');
      if (desc) frag.appendChild(desc);
    }

    // Tablet price (p) -- only if not already present
    const tabletPriceSection = contentSection.querySelector('.xps-tablet-price-section');
    if (tabletPriceSection) {
      const tabletPrice = tabletPriceSection.querySelector('p');
      if (tabletPrice) {
        // Avoid duplicate price
        const alreadyHas = Array.from(frag.children).some(
          (child) => child.textContent.trim() === tabletPrice.textContent.trim()
        );
        if (!alreadyHas) frag.appendChild(tabletPrice);
      }
    }

    // Swatch picker (color dots)
    const swatchContainer = contentSection.querySelector('.xps-product-card-hover-content-swatch-picker-container .xps-swatchpicker-container');
    if (swatchContainer) {
      // Only add if there are swatches
      if (swatchContainer.children.length > 0) {
        frag.appendChild(swatchContainer);
      }
    }

    // Optionally, add CTA link (not present in this HTML, but for future-proofing)
    // Example: a button or link at the bottom of contentSection
    // (Not implemented here as not present)

    // Wrap fragment in a div for table cell
    const wrapper = document.createElement('div');
    wrapper.appendChild(frag);
    return wrapper;
  }

  // Get all cards (immediate children with class 'xps-product-card-hover')
  const cards = Array.from(element.querySelectorAll(':scope > .xps-product-card-hover'));

  // Defensive: fallback if cards are not direct children
  if (cards.length === 0) {
    // Try to find all .xps-product-card-hover descendants
    const fallbackCards = Array.from(element.querySelectorAll('.xps-product-card-hover'));
    if (fallbackCards.length > 0) {
      cards.push(...fallbackCards);
    }
  }

  // Table header
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // For each card, build a row: [image, text content]
  cards.forEach((card) => {
    const img = getCardImage(card);
    const text = getCardText(card);
    rows.push([img, text]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
