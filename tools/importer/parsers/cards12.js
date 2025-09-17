/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing the cards
  const track = element.querySelector('.splide__track');
  if (!track) return;
  const list = track.querySelector('.splide__list');
  if (!list) return;

  // Only use real slides, not clones
  const slides = Array.from(list.children).filter(li => li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone'));

  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  slides.forEach((slide) => {
    // Defensive: Find the card aspect container
    const aspect = slide.querySelector('.xps-recipe-card-aspect');
    if (!aspect) return;
    const card = aspect.querySelector('.xps-recipe-card');
    if (!card) return;

    // IMAGE: First cell
    const img = card.querySelector('img.recipe-card__image');
    if (!img) return;

    // TEXT: Second cell
    // We'll build a fragment containing all text content
    const overlay = card.querySelector('.recipe-card__overlay');
    const textContent = document.createElement('div');
    textContent.style.display = 'contents'; // flatten

    // Tag (optional, above title)
    const tag = overlay && overlay.querySelector('.recipe-card__header .xps-tag');
    if (tag) {
      textContent.appendChild(tag.cloneNode(true));
    }

    // Title (h4)
    const titleWrap = overlay && overlay.querySelector('.recipe-card__title .xps-card-tile-title');
    if (titleWrap) {
      textContent.appendChild(titleWrap.cloneNode(true));
    }

    // Partner tag (author, optional)
    const partnerTag = overlay && overlay.querySelector('.recipe-card__footer .xps-partner-tag');
    if (partnerTag) {
      textContent.appendChild(partnerTag.cloneNode(true));
    }

    // Defensive: If no text content, skip
    if (!textContent.textContent.trim()) return;

    rows.push([img.cloneNode(true), textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
