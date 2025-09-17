/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel track containing the list of slides
  const track = element.querySelector('.splide__track');
  if (!track) return;
  const list = track.querySelector('.splide__list');
  if (!list) return;

  // Get all card slides (li elements)
  const slides = Array.from(list.children);
  const rows = [];
  // Header row per spec
  const headerRow = ['Cards (cards9)'];
  rows.push(headerRow);

  slides.forEach((slide) => {
    // Each slide contains a card tile
    const cardTile = slide.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // --- IMAGE CELL ---
    // Find the image inside the card
    let image = null;
    const img = cardTile.querySelector('img');
    if (img) {
      image = img;
    }

    // --- TEXT CELL ---
    // Compose text cell by including all relevant text content
    const textCell = document.createElement('div');
    // Title (h5)
    const title = cardTile.querySelector('.xps-card-tile-title');
    if (title) {
      textCell.appendChild(title.cloneNode(true));
    }
    // Author name (desc)
    const desc = cardTile.querySelector('.xps-text-p1');
    if (desc) {
      textCell.appendChild(desc.cloneNode(true));
    }
    // If there are other text blocks, include them (for future flexibility)
    Array.from(cardTile.querySelectorAll('.xps-text:not(.xps-card-tile-title):not(.xps-text-p1)')).forEach((el) => {
      textCell.appendChild(el.cloneNode(true));
    });

    rows.push([
      image,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
