/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Table header row
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // Get all visible slides (cards)
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  slides.forEach((li) => {
    // Defensive: Find the card anchor
    const cardLink = li.querySelector('a.xps-card-tile');
    if (!cardLink) return;

    // Find image container and image
    const imgContainer = cardLink.querySelector('.xps-card-tile-image');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Find title
    const titleEl = cardLink.querySelector('.xps-card-tile-title');

    // Compose text cell: title only (no description or CTA in source)
    const textCell = [];
    if (titleEl) textCell.push(titleEl);

    // Compose row: [image, text]
    rows.push([
      imgEl || '',
      textCell.length ? textCell : ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
