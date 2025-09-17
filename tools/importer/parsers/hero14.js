/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check for required containers
  const details = element.querySelector('.xps-slide-show-card-content-details');
  const imageContainer = element.querySelector('.xps-slide-show-card-content-image-container');

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero14)'];

  // --- IMAGE ROW ---
  let imageRow;
  let bgImg = null;
  if (imageContainer) {
    // Find any <img> inside imageContainer
    const img = imageContainer.querySelector('img');
    if (img) {
      bgImg = img;
    }
  }
  imageRow = [bgImg ? bgImg : ''];

  // --- CONTENT ROW ---
  // Compose the content cell
  const contentFragments = [];

  if (details) {
    // Popular Recipes (subheading)
    const subheading = details.querySelector('.xps-text-p3');
    if (subheading) contentFragments.push(subheading);

    // Main Heading
    const heading = details.querySelector('.xps-card-tile-title');
    if (heading) contentFragments.push(heading);

    // Circle card (product info)
    const circleCard = details.querySelector('.xps-circle-card');
    if (circleCard) contentFragments.push(circleCard);

    // Description paragraph
    const desc = details.querySelector('.xps-card-tile-description');
    if (desc) contentFragments.push(desc);

    // CTA Button (View recipe)
    const cta = details.querySelector('.xps-card-tile-button-wrapper');
    if (cta) contentFragments.push(cta);
  }

  const contentRow = [contentFragments];

  // --- TABLE ASSEMBLY ---
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
