/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (must match target block name exactly)
  const headerRow = ['Hero (hero24)'];

  // 2. Image row (background/main visual)
  let imageRow;
  const imgEl = element.querySelector('img');
  if (imgEl) {
    imageRow = [imgEl]; // use the actual image element
  } else {
    imageRow = [''];
  }

  // 3. Content row (title, description, CTA)
  let contentRow;
  const contentParts = [];
  // Find the content container
  const contentContainer = element.querySelector('.xps-teaser__content, .xps-card-tile-content-left');
  if (contentContainer) {
    // Title (h2 or h1)
    const title = contentContainer.querySelector('h2, h1, .xps-card-tile-title');
    if (title) contentParts.push(title);
    // Description (p)
    const desc = contentContainer.querySelector('.xps-card-tile-description, p');
    if (desc) contentParts.push(desc);
    // CTA (button link)
    let ctaBtn = contentContainer.querySelector('a[role="button"]');
    if (ctaBtn) contentParts.push(ctaBtn);
  }
  contentRow = [contentParts];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
