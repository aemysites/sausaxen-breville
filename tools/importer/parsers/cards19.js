/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate li children of the carousel
  const slides = element.querySelectorAll('.splide__slide');
  const rows = [];

  // Use the required header row
  const headerRow = ['Cards (cards19)'];
  rows.push(headerRow);

  slides.forEach((slide) => {
    // Defensive: find the card root
    const card = slide.querySelector('.xps-circle-card');
    if (!card) return;

    // Find the image (inside a link)
    const header = card.querySelector('.xps-circle-card__header');
    let img = null;
    if (header) {
      img = header.querySelector('img');
    }

    // Find the title
    const body = card.querySelector('.xps-circle-card__body');
    let title = null;
    if (body) {
      title = body.querySelector('.xps-circle-card--title');
    }

    // Build the image cell
    let imageCell = img ? img : '';

    // Build the text cell
    let textCell = title ? title : '';

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
