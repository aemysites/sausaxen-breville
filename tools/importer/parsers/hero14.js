/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main image for the hero background (should be the image in the circle card)
  let imageEl = null;
  const circleImg = element.querySelector('.xps-circle-card__header img');
  if (circleImg) {
    imageEl = circleImg;
  }

  // Find the main heading and subheading
  const headingEl = element.querySelector('h3.xps-card-tile-title');
  // The subheading is the first .xps-text-p3 that is NOT the description
  let subheadingEl = null;
  const p3s = element.querySelectorAll('.xps-text-p3');
  for (const p3 of p3s) {
    if (!p3.closest('.xps-card-tile-description')) {
      subheadingEl = p3;
      break;
    }
  }
  // The description is the paragraph inside .xps-card-tile-description
  const descriptionEl = element.querySelector('.xps-card-tile-description p');
  // The CTA is the button link in .xps-card-tile-button-wrapper
  const ctaEl = element.querySelector('.xps-card-tile-button-wrapper a');

  // The circle card ("Tailored for") is a visual element, include as-is
  const circleCard = element.querySelector('.xps-circle-card');

  // Compose the content cell for the third row, referencing existing elements
  const contentParts = [];
  if (subheadingEl) contentParts.push(subheadingEl);
  if (headingEl) contentParts.push(headingEl);
  if (circleCard) contentParts.push(circleCard);
  if (descriptionEl) contentParts.push(descriptionEl);
  if (ctaEl) contentParts.push(ctaEl);

  // Table rows
  const headerRow = ['Hero (hero14)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentParts];

  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
