/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Table header as required
  const headerRow = ['Carousel (carousel3)'];
  const rows = [headerRow];

  // Find the carousel list of slides (ul.splide__list)
  // Defensive: Search for the carousel wrapper
  const carouselWrapper = element.querySelector('.xps-carousel-wrapper');
  if (!carouselWrapper) return;

  const splideList = carouselWrapper.querySelector('ul.splide__list');
  if (!splideList) return;

  // Get all slide <li> elements
  const slideLis = splideList.querySelectorAll(':scope > li.splide__slide');

  slideLis.forEach((li) => {
    // Defensive: Find the card tile inside each slide
    const cardTile = li.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Find image (first cell)
    let imgEl = null;
    const imgWrapper = cardTile.querySelector('.xps-card-tile-image');
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }

    // Second cell: Text content
    const textCellContent = [];

    // Title (bold quote)
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    if (titleEl) {
      // Convert to heading element for semantic structure
      const heading = document.createElement('h3');
      heading.textContent = titleEl.textContent;
      textCellContent.push(heading);
    }

    // Description (product name and author)
    const descEl = cardTile.querySelector('.xps-card-tile-description');
    if (descEl) {
      // Defensive: Only add if not empty
      if (descEl.textContent.trim()) {
        // Use the whole block for resilience
        textCellContent.push(descEl);
      }
    }

    // Add row: [image, text content]
    // Defensive: Only add if image exists
    if (imgEl) {
      rows.push([
        imgEl,
        textCellContent.length ? textCellContent : ''
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
