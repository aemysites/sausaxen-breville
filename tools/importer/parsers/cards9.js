/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all card tiles
  function getCardTiles(root) {
    const track = root.querySelector('.splide__track');
    if (!track) return [];
    const list = track.querySelector('ul');
    if (!list) return [];
    return Array.from(list.children).map(li => {
      const card = li.querySelector('.xps-card-tile');
      return card || li;
    });
  }

  // Helper to build the image (with play icon overlay if present)
  function extractImage(card) {
    const img = card.querySelector('img');
    if (!img) return null;
    return img;
  }

  // Helper to build the text cell (title + author)
  function extractTextContent(card) {
    const fragment = document.createDocumentFragment();
    // Title (h5)
    const title = card.querySelector('.xps-card-tile-title');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      fragment.appendChild(strong);
      fragment.appendChild(document.createElement('br'));
    }
    // Author (description)
    const desc = card.querySelector('.xps-text-p1');
    if (desc) {
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      fragment.appendChild(p);
    }
    // Add any additional text nodes that may be present (for flexibility)
    // Get all direct children of card that are text nodes or elements with text
    Array.from(card.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        fragment.appendChild(span);
        fragment.appendChild(document.createElement('br'));
      } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('xps-card-tile-title') && !node.classList.contains('xps-text-p1') && node.textContent.trim()) {
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        fragment.appendChild(span);
        fragment.appendChild(document.createElement('br'));
      }
    });
    return fragment;
  }

  const headerRow = ['Cards (cards9)'];
  const rows = [headerRow];

  const cards = getCardTiles(element);
  cards.forEach(card => {
    const image = extractImage(card);
    const textContent = extractTextContent(card);
    rows.push([
      image,
      textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
