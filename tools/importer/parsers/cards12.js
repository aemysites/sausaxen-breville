/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing the list of slides
  const track = element.querySelector('.splide__track');
  if (!track) return;
  const list = track.querySelector('.splide__list');
  if (!list) return;

  // Get all real (non-clone) slides
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone'));

  // Table header
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Find the card aspect wrapper
    const cardAspect = slide.querySelector('.xps-recipe-card-aspect');
    if (!cardAspect) return;
    const card = cardAspect.querySelector('.xps-recipe-card');
    if (!card) return;

    // Image (first cell)
    const img = card.querySelector('img.recipe-card__image');
    const imageCell = img ? img : '';

    // Text content (second cell)
    const overlay = card.querySelector('.recipe-card__overlay');
    let textCell = '';
    if (overlay) {
      // Instead of picking only specific elements, clone the overlay and remove the image if present
      const overlayClone = overlay.cloneNode(true);
      // Remove any images inside the overlay (shouldn't be any, but defensive)
      overlayClone.querySelectorAll('img').forEach(img => img.remove());
      textCell = overlayClone;
    }
    rows.push([imageCell, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
