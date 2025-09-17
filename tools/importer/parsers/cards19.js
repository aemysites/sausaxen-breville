/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const list = element.querySelector('.splide__list');
  if (!list) return;

  // Get all card items (li elements)
  const items = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  // Table header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // For each card, extract image and text
  items.forEach(li => {
    // Find the card container
    const card = li.querySelector('.xps-circle-card');
    if (!card) return;

    // --- IMAGE CELL ---
    // Find the image inside the card
    let img = card.querySelector('img');
    // Defensive: If image is inside a link, use the link as the cell
    let imageCell;
    const header = card.querySelector('.xps-circle-card__header');
    if (header) {
      // Use the <a> containing the image, if present
      const link = header.querySelector('a');
      if (link) {
        imageCell = link;
      } else if (img) {
        imageCell = img;
      } else {
        imageCell = '';
      }
    } else if (img) {
      imageCell = img;
    } else {
      imageCell = '';
    }

    // --- TEXT CELL ---
    // Find the title
    let title = card.querySelector('.xps-circle-card__body .xps-circle-card--title');
    let textCell;
    if (title) {
      // Wrap title in a <strong> for heading semantics
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCell = strong;
    } else {
      textCell = '';
    }

    // Add row: [imageCell, textCell]
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
