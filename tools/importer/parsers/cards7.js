/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from card
  function getCardImage(card) {
    // Find the first img inside the media section
    const mediaSection = card.querySelector('.xps-product-card-hover-media-section');
    if (mediaSection) {
      const img = mediaSection.querySelector('img');
      if (img) return img;
    }
    return null;
  }

  // Helper to extract text content from card
  function getCardText(card) {
    const contentSection = card.querySelector('.xps-product-card-hover-content-section');
    if (!contentSection) return document.createElement('div');
    const textContainer = document.createElement('div');

    // Title
    const titleSection = contentSection.querySelector('.xps-product-card-hover-content-title-section');
    if (titleSection) {
      const title = titleSection.querySelector('h3');
      if (title) {
        // Use a heading element for semantic structure
        const heading = document.createElement('h3');
        heading.textContent = title.textContent.trim();
        textContainer.appendChild(heading);
      }
      // Price (first price, bold price is repeated below)
      const priceSection = titleSection.querySelector('.xps-product-card-hover-content-price-section h3');
      if (priceSection) {
        // Add price as strong text
        const price = document.createElement('strong');
        price.textContent = priceSection.textContent.trim();
        textContainer.appendChild(price);
      }
    }

    // Description
    const descSection = contentSection.querySelector('.xps-product-card-hover-content-description-section p');
    if (descSection) {
      const desc = document.createElement('p');
      desc.textContent = descSection.textContent.trim();
      textContainer.appendChild(desc);
    }

    // Swatch picker (color options)
    const swatchContainer = contentSection.querySelector('.xps-product-card-hover-content-swatch-picker-container .xps-swatchpicker-container');
    if (swatchContainer) {
      // Only include the swatch row if there are swatches
      const swatchRow = document.createElement('div');
      swatchRow.style.display = 'flex';
      swatchRow.style.flexWrap = 'wrap';
      swatchRow.style.gap = '4px';
      swatchContainer.querySelectorAll('.xps-swatchpicker-static').forEach((swatch) => {
        const swatchImg = swatch.querySelector('img');
        if (swatchImg) {
          // Use the swatch image directly
          swatchRow.appendChild(swatchImg);
        }
      });
      if (swatchRow.childNodes.length > 0) {
        textContainer.appendChild(swatchRow);
      }
    }

    // Optionally, add CTA (if present)
    // In this HTML, the link is only around the image, not a CTA at the bottom
    // If you want to add the product link as a CTA, uncomment below:
    // const link = card.querySelector('a[href]');
    // if (link) {
    //   const cta = document.createElement('a');
    //   cta.href = link.href;
    //   cta.textContent = 'View Product';
    //   textContainer.appendChild(cta);
    // }

    return textContainer;
  }

  // Get all cards in the block
  const cards = Array.from(element.querySelectorAll(':scope > .xps-product-card-hover'));

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards7)']);

  // Card rows
  cards.forEach((card) => {
    const img = getCardImage(card);
    const text = getCardText(card);
    rows.push([
      img ? img : '',
      text
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
