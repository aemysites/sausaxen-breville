/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const cardsList = element.querySelector('ul.splide__list');
  if (!cardsList) return;

  // Table header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all card slides (li elements)
  const cardItems = cardsList.querySelectorAll('li.splide__slide');
  cardItems.forEach((li) => {
    // Find the card container
    const card = li.querySelector('.xps-circle-card');
    if (!card) return;

    // Image: find the img inside the card header
    let imageEl = null;
    const header = card.querySelector('.xps-circle-card__header');
    if (header) {
      imageEl = header.querySelector('img');
    }

    // Text: find the title inside the card body
    let textEl = null;
    const body = card.querySelector('.xps-circle-card__body');
    if (body) {
      textEl = body.querySelector('.xps-circle-card--title');
    }

    // Defensive: only add if image and text are present
    if (imageEl && textEl) {
      rows.push([
        imageEl,
        textEl,
      ]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
