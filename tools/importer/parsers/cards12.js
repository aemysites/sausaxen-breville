/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Defensive: find the carousel track containing the list of cards
  const track = element.querySelector('.splide__track');
  if (!track) return;
  const list = track.querySelector('.splide__list');
  if (!list) return;

  // Get all visible slides (cards) - ignore clones and hidden ones
  const slides = Array.from(list.children).filter(li => {
    // Only include slides that do NOT have splide__slide--clone
    return li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone');
  });

  // If no real slides found, fallback to all .splide__slide elements (defensive)
  const cards = slides.length ? slides : Array.from(list.querySelectorAll('.splide__slide')).filter(li => !li.classList.contains('splide__slide--clone'));

  // For each card, extract image and text content
  cards.forEach(card => {
    // Defensive: find the card content wrapper
    const cardAspect = card.querySelector('.xps-recipe-card-aspect');
    const cardContent = cardAspect ? cardAspect.querySelector('.xps-recipe-card') : card.querySelector('.xps-recipe-card');
    if (!cardContent) return;

    // 1. Image (first cell)
    const img = cardContent.querySelector('img.recipe-card__image');

    // 2. Text content (second cell)
    // We'll collect: category/tag, title, partner tag (author)
    const overlay = cardContent.querySelector('.recipe-card__overlay');
    let textCell = '';
    if (overlay) {
      // Instead of picking individual elements, clone the overlay and use its full content
      textCell = overlay.cloneNode(true);
    }

    // Add row: [image, textCell]
    rows.push([
      img || '',
      textCell || ''
    ]);
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
