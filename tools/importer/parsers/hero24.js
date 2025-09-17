/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the image (background asset)
  let imageEl = null;
  const mediaDiv = element.querySelector('.xps-teaser--media');
  if (mediaDiv) {
    imageEl = mediaDiv.querySelector('img');
  } else {
    imageEl = element.querySelector('img');
  }

  // 2. Extract the content (title, description, CTA)
  let contentEl = null;
  const contentDiv = element.querySelector('.xps-teaser__content');
  if (contentDiv) {
    contentEl = contentDiv;
  } else {
    // fallback: find first heading in block
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      contentEl = heading.parentElement;
    }
  }

  // 3. Compose the table rows
  const headerRow = ['Hero (hero24)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentEl ? contentEl : ''];

  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  // 4. Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the block table
  element.replaceWith(block);
}
