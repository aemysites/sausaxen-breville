/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all carousel slides
  function getSlides(container) {
    // Find the carousel wrapper (splide)
    const splide = container.querySelector('.splide');
    if (!splide) return [];
    // Find the list of slides
    const list = splide.querySelector('.splide__list');
    if (!list) return [];
    // Each slide is a <li> with a .xps-card-tile inside
    return Array.from(list.children)
      .map(li => li.querySelector('.xps-card-tile'))
      .filter(Boolean);
  }

  // Find the carousel container in the given element
  // Defensive: look for .xps-carousel-wrapper or .splide inside the element
  let carouselContainer = element.querySelector('.xps-carousel-wrapper');
  if (!carouselContainer) {
    carouselContainer = element.querySelector('.splide');
    if (carouselContainer) {
      // Go up to the wrapper if possible
      const wrapper = carouselContainer.closest('.xps-carousel-wrapper');
      if (wrapper) carouselContainer = wrapper;
    }
  }
  if (!carouselContainer) return;

  // Get all slide card elements
  const slides = getSlides(carouselContainer);
  if (!slides.length) return;

  // Build table rows: header first
  const rows = [
    ['Carousel (carousel3)'],
  ];

  // For each slide, extract image and text content
  slides.forEach(card => {
    // Find image: inside .xps-card-tile-image img
    let img = null;
    const imgWrap = card.querySelector('.xps-card-tile-image');
    if (imgWrap) {
      img = imgWrap.querySelector('img');
    }
    // Defensive: skip slide if no image
    if (!img) return;

    // Find text content: title and description
    // Title: .xps-card-tile-title (can be h3 or div)
    const title = card.querySelector('.xps-card-tile-title');
    // Description: .xps-card-tile-description
    const desc = card.querySelector('.xps-card-tile-description');
    // Compose text cell content
    const textContent = [];
    if (title) textContent.push(title);
    if (desc) textContent.push(desc);

    rows.push([
      img, // first cell: image element
      textContent.length ? textContent : '', // second cell: text content or empty
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
