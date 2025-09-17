/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all slides from the carousel
  function getSlides(carouselRoot) {
    // Find the <ul class="splide__list"> inside the carousel
    const list = carouselRoot.querySelector('ul.splide__list');
    if (!list) return [];
    // Each <li> is a slide
    return Array.from(list.children).filter(li => li.matches('li.splide__slide'));
  }

  // Helper to get image element from a slide
  function getImage(slide) {
    // Find the first <img> inside the slide
    const img = slide.querySelector('img');
    return img || null;
  }

  // Helper to get text content from a slide
  function getTextContent(slide) {
    // Find the card tile inside the slide
    const card = slide.querySelector('.xps-card-tile');
    if (!card) return null;

    // Title
    let title = card.querySelector('.xps-card-tile-title');
    // Defensive: sometimes the title is inside an <h3>, sometimes a <div>
    if (title) {
      // Wrap in <h3> if not already
      if (title.tagName.toLowerCase() !== 'h3') {
        const h3 = document.createElement('h3');
        h3.append(title.textContent);
        title = h3;
      }
    }

    // Description
    const desc = card.querySelector('.xps-card-tile-description');
    // Defensive: could be null
    let descNodes = [];
    if (desc) {
      // Use all child nodes (e.g. <p>, <span>)
      descNodes = Array.from(desc.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    }

    // Compose text cell
    const cellContent = [];
    if (title) cellContent.push(title);
    if (descNodes.length) cellContent.push(...descNodes);
    if (cellContent.length === 0) return null;
    return cellContent;
  }

  // Find the carousel root inside the block
  // Defensive: look for .xps-carousel-wrapper or .splide
  let carouselRoot = element.querySelector('.xps-carousel-wrapper');
  if (!carouselRoot) {
    carouselRoot = element.querySelector('.splide');
  }
  if (!carouselRoot) return;

  // Extract slides
  const slides = getSlides(carouselRoot);
  if (!slides.length) return;

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Carousel (carousel3)']);

  // Each slide: [image, text]
  slides.forEach(slide => {
    const img = getImage(slide);
    const textContent = getTextContent(slide);
    // Only add if there is an image
    if (img) {
      rows.push([
        img,
        textContent || ''
      ]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
