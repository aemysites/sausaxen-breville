/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required: exactly one column, block name only
  const headerRow = ['Cards (cards13)'];
  const cells = [headerRow];

  // Defensive: Find the carousel list of slides
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Get all direct card <li> elements
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  slides.forEach((li) => {
    // Defensive: Find the card anchor
    const cardLink = li.querySelector('a.xps-card-tile');
    if (!cardLink) return;

    // Find the image (mandatory)
    const imgWrap = cardLink.querySelector('.xps-card-tile-image');
    let imgEl = imgWrap ? imgWrap.querySelector('img') : null;
    // Defensive: Only use <img> if present
    if (!imgEl) return;

    // Find the title (mandatory)
    const titleEl = cardLink.querySelector('.xps-card-tile-title');
    // Defensive: Only use if present
    let titleNode = null;
    if (titleEl) {
      // Create a heading element for the title
      const heading = document.createElement('strong');
      heading.textContent = titleEl.textContent.trim();
      titleNode = heading;
    }

    // Compose the text cell
    const textCell = [];
    if (titleNode) textCell.push(titleNode);
    // No description or CTA in source, so only title

    // Compose the row: [image, text]
    cells.push([
      imgEl,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
