/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the carousel list of cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Table header row
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  // Each card is a <li> containing <a> with image and title
  const items = list.querySelectorAll(':scope > li');
  items.forEach((li) => {
    // Defensive: Find the anchor
    const cardLink = li.querySelector('a.xps-card-tile');
    if (!cardLink) return;

    // Find image
    const imgWrapper = cardLink.querySelector('.xps-card-tile-image');
    let img = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Find title
    const titleEl = cardLink.querySelector('.xps-card-tile-title');

    // Build text cell: title only (no description in source)
    let textCell = [];
    if (titleEl) {
      // Use <strong> for heading style
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      textCell.push(strong);
    }
    // If there is a link and it's not redundant, add as CTA
    // (But in this case, title is the only text, so skip CTA)

    // Row: [image, text]
    rows.push([
      img || '',
      textCell.length ? textCell : ''
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
