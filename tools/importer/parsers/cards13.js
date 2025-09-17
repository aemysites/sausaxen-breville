/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Table header row as required (EXACTLY one column)
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // Get all carousel slides (cards)
  const cards = Array.from(list.children);
  cards.forEach((li) => {
    // Defensive: Find the anchor inside each slide
    const cardLink = li.querySelector('a.xps-card-tile');
    if (!cardLink) return;

    // Find image container and image
    const imageContainer = cardLink.querySelector('.xps-card-tile-image');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Find title
    const titleDiv = cardLink.querySelector('.xps-card-tile-title');
    // Defensive: Create a heading element for the title
    let heading = null;
    if (titleDiv) {
      heading = document.createElement('strong');
      heading.textContent = titleDiv.textContent.trim();
    }

    // Compose first cell: image (mandatory)
    const imageCell = img ? img : '';
    // Compose second cell: title (mandatory)
    const textCell = heading ? heading : '';

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
