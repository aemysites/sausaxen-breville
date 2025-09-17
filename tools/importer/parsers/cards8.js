/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row: must be exactly one column with block name
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Get all card containers (each col contains a card)
  const cardCols = element.querySelectorAll(':scope > div');

  cardCols.forEach((col) => {
    const card = col.querySelector('.xps-support-card');
    if (!card) return;

    // Find image (mandatory)
    const img = card.querySelector('img');

    // Find text content (mandatory)
    const textDiv = card.querySelector('.xps-text');
    let textContent = null;
    if (textDiv) {
      // Extract the text as a heading (strong) and description (if present)
      const p = textDiv.querySelector('p');
      if (p) {
        // Create a fragment for cell content
        const frag = document.createDocumentFragment();
        const strong = document.createElement('strong');
        strong.textContent = p.textContent;
        frag.appendChild(strong);
        textContent = frag;
      } else {
        textContent = textDiv;
      }
    }

    // Only add row if both image and text are present
    if (img && textContent) {
      rows.push([img, textContent]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
