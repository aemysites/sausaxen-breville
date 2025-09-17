/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract visible slides only (not clones)
  function getSlides(element) {
    const list = element.querySelector('.splide__list');
    if (!list) return [];
    return Array.from(list.children).filter(li =>
      li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone')
    );
  }

  // Helper to extract image from card
  function getCardImage(card) {
    return card.querySelector('img');
  }

  // Helper to extract all text content from card
  function getCardText(card) {
    const overlay = card.querySelector('.recipe-card__overlay');
    if (!overlay) return '';
    const frag = document.createElement('div');
    // Tag/category
    const tag = overlay.querySelector('.recipe-card__header .xps-tag span');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.textContent = tag.textContent.trim();
      tagDiv.style.fontWeight = 'bold';
      tagDiv.style.fontSize = '0.9em';
      frag.appendChild(tagDiv);
    }
    // Title
    const title = overlay.querySelector('.recipe-card__title h4');
    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.textContent = title.textContent.trim();
      titleDiv.style.fontWeight = 'bold';
      titleDiv.style.fontSize = '1.1em';
      frag.appendChild(titleDiv);
    }
    // Partner/author
    const partner = overlay.querySelector('.recipe-card__footer .xps-partner-tag-title');
    if (partner) {
      const partnerDiv = document.createElement('div');
      partnerDiv.textContent = partner.textContent.trim();
      partnerDiv.style.fontSize = '0.9em';
      partnerDiv.style.marginTop = '8px';
      frag.appendChild(partnerDiv);
    }
    // If nothing found, fallback to all text
    if (!frag.textContent.trim()) {
      frag.textContent = overlay.textContent.trim();
    }
    return frag;
  }

  // Find the splide carousel
  const splide = element.querySelector('.splide');
  if (!splide) return;
  const slides = getSlides(splide);

  // Build table rows
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];
  slides.forEach(slide => {
    const card = slide.querySelector('.xps-recipe-card');
    if (!card) return;
    const img = getCardImage(card);
    const textElem = getCardText(card);
    rows.push([
      img,
      textElem
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
