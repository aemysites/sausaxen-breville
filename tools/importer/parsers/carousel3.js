/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel wrapper
  const carouselWrapper = element.querySelector('.xps-carousel-wrapper');
  if (!carouselWrapper) return;

  // Find the slides list
  const slidesList = carouselWrapper.querySelector('ul.splide__list');
  if (!slidesList) return;

  // Prepare table rows
  const rows = [];
  // Header row as required
  rows.push(['Carousel (carousel3)']);

  // Get all slides
  const slides = slidesList.querySelectorAll('li.splide__slide');
  slides.forEach((slide) => {
    // Each slide contains a .xps-card-tile
    const cardTile = slide.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Image cell: find the image inside aspect-ratio
    let imageCell = '';
    const img = cardTile.querySelector('.aspect-ratio img');
    if (img) {
      imageCell = img;
    }

    // Text cell: get title and description
    const textCellContent = [];
    // Title
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    if (titleEl) {
      // If it's bold, wrap in h3
      if (/p1-bold/.test(titleEl.className)) {
        const heading = document.createElement('h3');
        heading.textContent = titleEl.textContent;
        textCellContent.push(heading);
      } else {
        textCellContent.push(titleEl);
      }
    }
    // Description
    const descEl = cardTile.querySelector('.xps-card-tile-description');
    if (descEl) {
      descEl.querySelectorAll('p').forEach((p) => {
        textCellContent.push(p);
      });
    }

    rows.push([imageCell, textCellContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
