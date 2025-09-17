/* global WebImporter */
export default function parse(element, { document }) {
  // Find the selected tab panel
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the carousel list containing the cards
  const carouselList = selectedPanel.querySelector('.xps-carousel-wrapper .splide__list');
  if (!carouselList) return;

  // Prepare the header row as required
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // For each card/slide, extract image and text content
  const slides = carouselList.querySelectorAll(':scope > li.splide__slide');
  slides.forEach((slide) => {
    // Extract the card image (first image in card)
    const img = slide.querySelector('img.recipe-card__image');
    // Defensive: skip if no image
    if (!img) return;

    // Extract the overlay containing text content
    const overlay = slide.querySelector('.recipe-card__overlay');
    if (!overlay) return;

    // Extract title (h4), subtitle (header), and author
    const titleEl = overlay.querySelector('.recipe-card__title p');
    const title = titleEl ? titleEl.textContent.trim() : '';
    const subtitleEl = overlay.querySelector('.recipe-card__header span');
    const subtitle = subtitleEl ? subtitleEl.textContent.trim() : '';
    const authorEl = overlay.querySelector('.recipe-card__footer .xps-partner-tag-title');
    const author = authorEl ? authorEl.textContent.trim() : '';

    // Compose the text cell content
    const textDiv = document.createElement('div');
    if (subtitle) {
      const subtitleDiv = document.createElement('div');
      subtitleDiv.textContent = subtitle;
      subtitleDiv.style.fontSize = 'smaller';
      subtitleDiv.style.fontWeight = 'bold';
      textDiv.appendChild(subtitleDiv);
    }
    if (title) {
      const titleElH = document.createElement('h4');
      titleElH.textContent = title;
      textDiv.appendChild(titleElH);
    }
    if (author) {
      const authorDiv = document.createElement('div');
      authorDiv.textContent = author;
      authorDiv.style.fontSize = 'smaller';
      textDiv.appendChild(authorDiv);
    }

    // Compose the row: [image element, text content]
    rows.push([img, textDiv]);
  });

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
