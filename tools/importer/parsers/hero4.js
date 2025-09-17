/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find background image (img inside .xps-herobanner-background-image)
  let bgImg = null;
  const bgImgContainer = element.querySelector('.xps-herobanner-background-image');
  if (bgImgContainer) {
    const img = bgImgContainer.querySelector('img');
    if (img) bgImg = img;
  }

  // Defensive: Find content container
  let contentContainer = null;
  const contentCandidates = element.querySelectorAll('.xps-herobanner-content-container');
  if (contentCandidates.length) {
    contentContainer = contentCandidates[contentCandidates.length - 1]; // Use the deepest
  }

  // Defensive: Find heading, description, and CTA buttons
  let heading = null;
  let description = null;
  let ctaWrapper = null;
  if (contentContainer) {
    heading = contentContainer.querySelector('.xps-card-tile-title');
    description = contentContainer.querySelector('.xps-card-tile-description');
    ctaWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
  }

  // Compose content cell (row 3): heading, description, CTA
  const contentCellItems = [];
  if (heading) contentCellItems.push(heading);
  if (description) contentCellItems.push(description);
  if (ctaWrapper) contentCellItems.push(ctaWrapper);

  // Build table rows
  const headerRow = ['Hero (hero4)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCellItems.length ? contentCellItems : ''];

  const cells = [headerRow, imageRow, contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
