/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Table header row
  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  // Get all card slides (li elements)
  const cards = Array.from(list.children);

  cards.forEach((card) => {
    // Find the card tile container
    const cardTile = card.querySelector('.xps-card-tile');
    if (!cardTile) return;

    // --- IMAGE CELL ---
    let imageEl = null;
    const img = cardTile.querySelector('.xps-video-modal img');
    if (img) {
      imageEl = img.cloneNode(true);
    }

    // --- TEXT CELL ---
    // Find the title (h5)
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    // Find the description (div.xps-text-p1)
    const descEl = cardTile.querySelector('.xps-text-p1');

    // Compose text cell contents as a block element to preserve structure
    const textDiv = document.createElement('div');
    if (titleEl) {
      const h = document.createElement('strong');
      h.textContent = titleEl.textContent.trim();
      textDiv.appendChild(h);
      textDiv.appendChild(document.createElement('br'));
    }
    if (descEl) {
      const p = document.createElement('span');
      p.textContent = descEl.textContent.trim();
      textDiv.appendChild(p);
    }

    // Add row: [image, text]
    rows.push([imageEl, textDiv]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
