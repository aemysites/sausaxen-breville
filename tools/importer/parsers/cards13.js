/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel list containing all cards
  const list = element.querySelector('ul.splide__list');
  if (!list) return;

  // Get all card slides (li elements)
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide'));

  // Table header row: must be exactly one column
  const headerRow = ['Cards (cards13)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Each slide contains a div > a.xps-card-tile
    const cardLink = slide.querySelector('a.xps-card-tile');
    if (!cardLink) return;

    // Image: inside .xps-card-tile-image
    const imageWrapper = cardLink.querySelector('.xps-card-tile-image');
    let img = imageWrapper ? imageWrapper.querySelector('img') : null;
    let imageCell = img ? img : '';

    // Title: inside .xps-card-tile-title
    const title = cardLink.querySelector('.xps-card-tile-title');
    let textCell;
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      textCell = strong;
    } else {
      textCell = '';
    }

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
