/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract the hero image (background/visual)
  let imageEl = '';
  const mediaDiv = element.querySelector('.xps-teaser--media');
  if (mediaDiv) {
    const img = mediaDiv.querySelector('img');
    if (img) imageEl = img;
  }

  // 2. Extract content: heading, description, CTA (in order)
  const contentArr = [];
  const contentDiv = element.querySelector('.xps-teaser__content');
  if (contentDiv) {
    // Heading (keep heading level and bold if present)
    const heading = contentDiv.querySelector('.xps-card-tile-title');
    if (heading) contentArr.push(heading);
    // Description (keep all text, including paragraphs)
    const desc = contentDiv.querySelector('.xps-card-tile-description');
    if (desc) contentArr.push(desc);
    // CTA button (as link with text)
    const btn = contentDiv.querySelector('.xps-card-tile-button-wrapper a');
    if (btn) contentArr.push(btn);
  }

  // 3. Build the table rows
  const headerRow = ['Hero (hero24)'];
  const imageRow = [imageEl || ''];
  const contentRow = [contentArr.length ? contentArr : ''];

  // 4. Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // 5. Replace the original element with the block table
  element.replaceWith(table);
}
