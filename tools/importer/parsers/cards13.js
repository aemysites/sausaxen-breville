/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel list of cards
  const list = element.querySelector('.splide__list');
  if (!list) return;

  // Get all card slides (li elements)
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  // Table header row
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Each slide contains a <div><a>...</a></div>
    const cardLink = slide.querySelector('a.xps-card-tile');
    if (!cardLink) return;

    // Image: inside .xps-card-tile-image > img
    const imgWrapper = cardLink.querySelector('.xps-card-tile-image');
    let imgEl = null;
    if (imgWrapper) {
      imgEl = imgWrapper.querySelector('img');
    }

    // Title: .xps-card-tile-title
    const titleEl = cardLink.querySelector('.xps-card-tile-title');

    // Compose text cell
    const textCell = [];
    if (titleEl) textCell.push(titleEl);

    // Add row: [image, text]
    rows.push([
      imgEl || '',
      textCell.length > 0 ? textCell : ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
