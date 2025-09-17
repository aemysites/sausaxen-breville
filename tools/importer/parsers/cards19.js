/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const list = element.querySelector('.splide__list');
  if (!list) return;

  // Get all slide items (each card)
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  // Table header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Defensive: find the card container
    const card = slide.querySelector('.xps-circle-card');
    if (!card) return;

    // Find image (mandatory)
    let img = card.querySelector('img');
    // Defensive: ensure image exists
    if (!img) return;

    // Find title (mandatory)
    let title = card.querySelector('.xps-circle-card--title');
    // Defensive: ensure title exists
    if (!title) return;

    // Create a heading for the title
    const heading = document.createElement('h3');
    heading.textContent = title.textContent.trim();

    // Compose text cell (just heading, no description or CTA in this HTML)
    const textCell = heading;

    // Compose row: [image, text]
    rows.push([img, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
