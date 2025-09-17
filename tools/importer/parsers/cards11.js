/* global WebImporter */
export default function parse(element, { document }) {
  // Find the selected tab panel with content
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the carousel of cards
  const carousel = selectedPanel.querySelector('.xps-carousel-wrapper .splide__list');
  if (!carousel) return;

  // Table header as per block guidelines
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // For each card in carousel
  const slides = carousel.querySelectorAll('.splide__slide');
  slides.forEach((slide) => {
    // Defensive: find image
    const img = slide.querySelector('.recipe-card__image');
    // Defensive: find overlay
    const overlay = slide.querySelector('.recipe-card__overlay');
    if (!img || !overlay) return;

    // Compose text cell content
    const cellContent = document.createElement('div');

    // Tag/Category (e.g., Joule Oven, Smart Ovens)
    const headerTag = overlay.querySelector('.recipe-card__header .xps-tag');
    if (headerTag) {
      cellContent.appendChild(headerTag.cloneNode(true));
    }

    // Title (h4)
    const title = overlay.querySelector('.recipe-card__title .xps-text-h4');
    if (title) {
      cellContent.appendChild(title.cloneNode(true));
    }

    // Author (footer)
    const authorTagBox = overlay.querySelector('.recipe-card__footer .xps-partner-tag-box');
    if (authorTagBox) {
      cellContent.appendChild(authorTagBox.cloneNode(true));
    }

    // Only add row if mandatory fields present
    if (img && cellContent.childNodes.length > 0) {
      rows.push([
        img.cloneNode(true),
        cellContent
      ]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
