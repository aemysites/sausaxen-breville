/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards12)'];

  // Find the carousel track (where the cards are)
  const track = element.querySelector('.splide__track');
  if (!track) return;

  // Get all visible/non-clone slides only
  const slides = Array.from(track.querySelectorAll('.splide__slide')).filter(slide => !slide.classList.contains('splide__slide--clone'));

  // Defensive fallback: If no slides, try all li children
  const cardItems = slides.length ? slides : Array.from(track.querySelectorAll('li'));

  // Build card rows
  const rows = cardItems.map(slide => {
    // Find the card container
    const card = slide.querySelector('.xps-recipe-card');
    if (!card) return null;

    // Image (first cell)
    const img = card.querySelector('img.recipe-card__image');

    // Text cell: Compose tag, title, and partner
    const overlay = card.querySelector('.recipe-card__overlay');
    const textParts = [];

    // Tag (optional)
    const tagSpan = overlay && overlay.querySelector('.recipe-card__header .xps-tag span');
    if (tagSpan) {
      const tagP = document.createElement('p');
      tagP.textContent = tagSpan.textContent.trim();
      textParts.push(tagP);
    }

    // Title (mandatory)
    const h4 = overlay && overlay.querySelector('.recipe-card__title .xps-card-tile-title h4');
    if (h4) {
      // Clone the heading to preserve formatting
      textParts.push(h4.cloneNode(true));
    }

    // Partner tag (optional)
    const partnerBox = overlay && overlay.querySelector('.recipe-card__footer .xps-partner-tag-box');
    if (partnerBox) {
      // Compose avatar and name
      const avatarImg = partnerBox.querySelector('.xps-partner-tag-avatar-img');
      const partnerName = partnerBox.querySelector('.xps-partner-tag-title');
      if (avatarImg && partnerName) {
        // Inline avatar and name
        const partnerDiv = document.createElement('div');
        partnerDiv.appendChild(avatarImg.cloneNode(true));
        const nameSpan = document.createElement('span');
        nameSpan.textContent = partnerName.textContent.trim();
        nameSpan.style.marginLeft = '8px';
        partnerDiv.appendChild(nameSpan);
        textParts.push(partnerDiv);
      }
    }

    // Defensive: If no image or no text, skip this card
    if (!img || textParts.length === 0) return null;

    return [img.cloneNode(true), textParts];
  }).filter(Boolean);

  // Compose table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
