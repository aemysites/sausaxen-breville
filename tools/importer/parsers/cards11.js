/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !document) return;

  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Find the carousel with cards
  const cardWrapper = element.querySelector('.xps-carousel-wrapper');
  if (!cardWrapper) return;
  const slides = cardWrapper.querySelectorAll('.splide__slide');

  slides.forEach((slide) => {
    if (slide.hasAttribute('aria-hidden') && slide.getAttribute('aria-hidden') === 'true') return;

    // Image (first cell)
    const img = slide.querySelector('.recipe-card__image');

    // Compose text content (second cell)
    const overlay = slide.querySelector('.recipe-card__overlay');
    const textDiv = document.createElement('div');
    if (overlay) {
      // Tag (header)
      const tag = overlay.querySelector('.xps-tag span');
      if (tag) {
        const tagP = document.createElement('p');
        tagP.appendChild(document.createTextNode(tag.textContent.trim()));
        textDiv.appendChild(tagP);
      }
      // Title
      const title = overlay.querySelector('.recipe-card__title .xps-text-h4');
      if (title) {
        const titleH = document.createElement('h3');
        titleH.textContent = title.textContent.trim();
        textDiv.appendChild(titleH);
      }
      // Author (footer)
      const author = overlay.querySelector('.recipe-card__footer .xps-partner-tag-title');
      if (author) {
        const authorP = document.createElement('p');
        authorP.textContent = author.textContent.trim();
        textDiv.appendChild(authorP);
      }
    }
    rows.push([img, textDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
