/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Prepare header row
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  // Get all card slides
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  slides.forEach((slide) => {
    // Find the card tile root
    const cardTile = slide.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // --- IMAGE CELL ---
    let imageEl = null;
    const img = cardTile.querySelector('img');
    if (img) {
      imageEl = img;
    }

    // --- TEXT CELL ---
    // Instead of picking only specific elements, grab all text content in the card tile except the image
    // We'll clone the cardTile, remove the image container, and use the rest as the text cell
    const textCellDiv = document.createElement('div');
    // Clone all children except the video modal (which contains the image)
    Array.from(cardTile.children).forEach(child => {
      if (!child.classList.contains('xps-video-modal')) {
        textCellDiv.appendChild(child.cloneNode(true));
      }
    });

    // Compose row: [image, text]
    rows.push([
      imageEl,
      textCellDiv
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
