/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero14)'];

  // --- IMAGE ROW ---
  // Find the background image (if any)
  // The image is inside .xps-circle-card__header img (circle card), but the visual background is implied by the aspect-ratio container
  // For this block, use the prominent product image if present
  let imageEl = null;
  const circleHeader = element.querySelector('.xps-circle-card__header');
  if (circleHeader) {
    imageEl = circleHeader.querySelector('img');
  }
  // Defensive: fallback to any img inside the block if not found
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // --- CONTENT ROW ---
  // Compose content: Title, subtitle, description, CTA, and circle card info
  const contentParts = [];

  // Subheading (Popular Recipes)
  const subheading = element.querySelector('.xps-text-p3');
  if (subheading) contentParts.push(subheading);

  // Title (h3)
  const title = element.querySelector('.xps-card-tile-title');
  if (title) contentParts.push(title);

  // Circle card ("Tailored for" + product name)
  const circleCard = element.querySelector('.xps-circle-card');
  if (circleCard) contentParts.push(circleCard);

  // Description paragraph
  const description = element.querySelector('.xps-card-tile-description');
  if (description) contentParts.push(description);

  // CTA button ("View recipe")
  const cta = element.querySelector('.xps-card-tile-button-wrapper');
  if (cta) contentParts.push(cta);

  const contentRow = [contentParts];

  // --- TABLE CREATION ---
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
