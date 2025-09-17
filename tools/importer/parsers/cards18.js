/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card tile containers
  const cardRows = [];

  // Always use the required header row
  const headerRow = ['Cards (cards18)'];
  cardRows.push(headerRow);

  // Find all direct card tile elements within the block
  // The structure is: element > ... > .grid-container > ... > .row > .col-xl-4 > .xps-card-tile
  // We'll find all .xps-card-tile elements under the block
  const cardTiles = element.querySelectorAll('.xps-card-tile');

  cardTiles.forEach((cardTile) => {
    // Image: find the first img inside the card
    const imgContainer = cardTile.querySelector('.xps-card-tile-image');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    }

    // Text: find the title (h6)
    let textEls = [];
    const titleEl = cardTile.querySelector('.xps-card-tile-title');
    if (titleEl) {
      textEls.push(titleEl);
    }

    // If there is other text (description), add it below (not present in this HTML, but future-proof)
    // For now, only the h6 is present

    // Compose the row: [image, text]
    cardRows.push([
      imgEl,
      textEls.length > 1 ? textEls : textEls[0]
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cardRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
