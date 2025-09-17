/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero4)'];

  // Defensive: Find background image (first img in .xps-herobanner-background-image)
  let bgImg = null;
  const bgImgContainer = element.querySelector('.xps-herobanner-background-image');
  if (bgImgContainer) {
    const img = bgImgContainer.querySelector('img');
    if (img) bgImg = img;
  }
  // Row 2: background image (if present)
  const bgImgRow = [bgImg ? bgImg : ''];

  // Defensive: Find content container
  let contentContainer = null;
  const contentGrid = element.querySelector('.xps-herobanner-content-grid');
  if (contentGrid) {
    // Usually one column with .xps-herobanner-content-container
    const col = contentGrid.querySelector('.xps-herobanner-content-container');
    if (col) contentContainer = col;
  }

  // Defensive: Find title, description, CTA buttons
  let title = null;
  let description = null;
  let ctas = [];
  if (contentContainer) {
    // Title (h2)
    title = contentContainer.querySelector('h2');
    // Description (first .xps-card-tile-description)
    description = contentContainer.querySelector('.xps-card-tile-description');
    // CTA buttons (all <a> in .xps-card-tile-button-wrapper)
    const btnWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
    if (btnWrapper) {
      const btnLinks = Array.from(btnWrapper.querySelectorAll('a'));
      btnLinks.forEach((a) => {
        // Defensive: If <a> contains only graphics, add readable text
        let label = a.textContent.trim();
        if (!label) {
          // Try to get .sr-only text
          const sr = a.querySelector('.sr-only');
          if (sr) label = sr.textContent.trim();
        }
        // Create a new link with text (for clarity in block)
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = label || a.getAttribute('href');
        ctas.push(link);
      });
    }
  }

  // Compose content cell: title, description, ctas
  const contentCell = [];
  if (title) contentCell.push(title);
  if (description) contentCell.push(description);
  if (ctas.length) contentCell.push(...ctas);

  // Row 3: content cell
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
