/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const ul = element.querySelector('ul.splide__list');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all card slides (li elements)
  const lis = ul.querySelectorAll(':scope > li.splide__slide');
  lis.forEach((li) => {
    // Defensive: Find the card container
    const card = li.querySelector('.xps-circle-card');
    if (!card) return;

    // Image/Icon cell (first cell)
    let imageEl = null;
    const header = card.querySelector('.xps-circle-card__header');
    if (header) {
      // Find the img inside the header
      imageEl = header.querySelector('img');
    }

    // Text cell (second cell)
    let textCell = [];
    const body = card.querySelector('.xps-circle-card__body');
    if (body) {
      // Find the title
      const titleEl = body.querySelector('.xps-text-p2-bold');
      if (titleEl) {
        textCell.push(titleEl);
      }
    }

    // Compose row: [image, text]
    rows.push([
      imageEl || '',
      textCell.length ? textCell : '',
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
