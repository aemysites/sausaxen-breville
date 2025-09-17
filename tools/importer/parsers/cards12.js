/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel track (contains the list of cards)
  const track = element.querySelector('.splide__track');
  if (!track) return;

  // Find the list of slides (cards)
  const list = track.querySelector('.splide__list');
  if (!list) return;

  // Only use real slides, not clones
  const slides = Array.from(list.children).filter(li => {
    // Only include real slides (not clones)
    return li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone');
  });

  // Table header
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Defensive: find the card aspect container
    const aspect = slide.querySelector('.xps-recipe-card-aspect');
    if (!aspect) return;
    const card = aspect.querySelector('.xps-recipe-card');
    if (!card) return;

    // Find the image (first cell)
    const img = card.querySelector('img.recipe-card__image');
    // Defensive: only add if img exists
    const imageCell = img || '';

    // Second cell: text content
    // Get overlay
    const overlay = card.querySelector('.recipe-card__overlay');
    let textCell = '';
    if (overlay) {
      // Instead of picking specific elements, clone the entire overlay for full text content
      textCell = overlay.cloneNode(true);
    }

    rows.push([imageCell, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
