/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Table header as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all card slides
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  slides.forEach((slide) => {
    // Get the card container
    const card = slide.querySelector('.xps-circle-card');
    if (!card) return;

    // --- Image/Icon cell ---
    let imgCell = null;
    const header = card.querySelector('.xps-circle-card__header');
    if (header) {
      const img = header.querySelector('img');
      if (img) {
        imgCell = img;
      }
    }

    // --- Text cell ---
    // Title is inside .xps-circle-card__body > .xps-text-p2-bold.xps-circle-card--title
    let textCell = '';
    const body = card.querySelector('.xps-circle-card__body');
    if (body) {
      const title = body.querySelector('.xps-text-p2-bold.xps-circle-card--title');
      if (title) {
        textCell = title.textContent.trim();
      }
    }

    // Add row if image and text cell are present
    if (imgCell && textCell) {
      rows.push([imgCell, textCell]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix header row colspan to match two columns
  const th = table.querySelector('th');
  if (th && rows.length > 1 && rows[1].length === 2) {
    th.setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
