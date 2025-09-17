/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all carousel slides
  function getSlides(carouselList) {
    // Each <li> in the carousel list is a slide
    return Array.from(carouselList.querySelectorAll(':scope > li'));
  }

  // Find the carousel list within the element
  const carouselList = element.querySelector('.splide__list');
  if (!carouselList) return;

  // Build the table header
  const headerRow = ['Carousel (carousel3)'];

  // Build the rows for each slide
  const rows = getSlides(carouselList).map((slide) => {
    // Defensive: find the card tile inside the slide
    const cardTile = slide.querySelector('.xps-card-tile');
    if (!cardTile) return null;

    // Get the image element (first cell)
    let imgCell = null;
    const imgWrapper = cardTile.querySelector('.xps-card-tile-image');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) imgCell = img;
    }

    // Get the text content (second cell)
    // Compose title and description as a single block
    const textBlock = document.createElement('div');
    // Title
    const title = cardTile.querySelector('.xps-card-tile-title');
    if (title) {
      // Use a heading for the title
      const heading = document.createElement('h3');
      heading.textContent = title.textContent;
      textBlock.appendChild(heading);
    }
    // Description
    const desc = cardTile.querySelector('.xps-card-tile-description');
    if (desc) {
      // Append all paragraphs inside description
      Array.from(desc.children).forEach((child) => {
        textBlock.appendChild(child);
      });
    }
    // Only add textBlock if it has content
    const textCell = textBlock.childNodes.length ? textBlock : '';

    return [imgCell, textCell];
  }).filter(Boolean); // Remove any nulls

  // Compose the table cells
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
