/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Header row for the block table
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  // Get all card slides (li elements)
  const cards = list.querySelectorAll('li.splide__slide');

  cards.forEach((card) => {
    // Defensive: Find the card tile container
    const cardTile = card.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // --- IMAGE CELL ---
    // Find the image inside the video modal
    let imageEl = null;
    const imgContainer = cardTile.querySelector('.xps-video-modal .aspect-ratio img');
    if (imgContainer) {
      imageEl = imgContainer.cloneNode(true);
    }

    // --- TEXT CELL ---
    // Title (h5)
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    // Description (p1)
    const descEl = cardTile.querySelector('.xps-text-p1');

    // Compose text cell (ensure all text is included)
    const textCell = document.createElement('div');
    if (titleEl) {
      const h = document.createElement('strong');
      h.textContent = titleEl.textContent.trim();
      textCell.appendChild(h);
      textCell.appendChild(document.createElement('br'));
    }
    if (descEl) {
      const d = document.createElement('span');
      d.textContent = descEl.textContent.trim();
      textCell.appendChild(d);
    }

    // Add row: [image, text]
    rows.push([
      imageEl,
      textCell.childNodes.length ? textCell : ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
