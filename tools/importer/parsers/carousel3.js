/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel wrapper
  const carouselWrapper = element.querySelector('.xps-carousel-wrapper');
  if (!carouselWrapper) return;

  // Find the carousel list of slides
  const splideList = carouselWrapper.querySelector('.splide__list');
  if (!splideList) return;

  // Get all slides (li.splide__slide)
  const slides = Array.from(splideList.querySelectorAll(':scope > li.splide__slide'));

  // Table header row
  const headerRow = ['Carousel (carousel3)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Defensive: Find the card tile inside the slide
    const cardTile = slide.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Find image (first cell)
    let imageCell = null;
    const imgWrapper = cardTile.querySelector('.xps-card-tile-image');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) imageCell = img;
    }

    // Find text content (second cell)
    // We'll collect title and description, keeping their structure
    const textCellContent = [];
    const title = cardTile.querySelector('.xps-card-tile-title');
    if (title) {
      // Convert to heading (h3)
      let heading;
      if (/^h\d$/i.test(title.tagName)) {
        heading = title;
      } else {
        heading = document.createElement('h3');
        heading.innerHTML = title.innerHTML;
      }
      textCellContent.push(heading);
    }
    const desc = cardTile.querySelector('.xps-card-tile-description');
    if (desc) {
      // Add all paragraphs inside description
      Array.from(desc.children).forEach((child) => {
        if (child.tagName === 'P') {
          textCellContent.push(child);
        }
      });
    }

    // Compose row: [image, text content]
    rows.push([
      imageCell,
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
