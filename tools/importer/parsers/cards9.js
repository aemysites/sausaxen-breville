/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Get all slides (cards)
  const slides = Array.from(list.querySelectorAll('li.splide__slide'));

  // Header row for the block table
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Find the card tile
    const cardTile = slide.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // Image: find the first img inside the video modal
    let image = cardTile.querySelector('.xps-video-modal img');
    // Defensive: fallback for image
    if (!image) {
      image = document.createElement('span');
      image.textContent = '[Image missing]';
    }

    // Compose text cell by collecting all text content from the card tile
    const textCell = document.createElement('div');
    // Title
    const title = cardTile.querySelector('.xps-card-tile-title');
    if (title) {
      const h = document.createElement('strong');
      h.textContent = title.textContent;
      textCell.appendChild(h);
      textCell.appendChild(document.createElement('br'));
    }
    // Description
    const desc = cardTile.querySelector('.xps-text-p1');
    if (desc) {
      const d = document.createElement('span');
      d.textContent = desc.textContent;
      textCell.appendChild(d);
    }

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
