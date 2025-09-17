/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to find the background image (if any)
  function getBackgroundImage() {
    // Look for image inside circle card first
    const circleImg = element.querySelector('.xps-circle-card__header img');
    if (circleImg) return circleImg;
    // Fallback: look for any img
    const img = element.querySelector('img');
    if (img) return img;
    return null;
  }

  // Helper to collect the main content (title, subtitle, description, CTA)
  function getMainContent() {
    const content = document.createElement('div');
    // Subtitle (Popular Recipes)
    const subtitle = element.querySelector('.xps-text.xps-text-p3:not(.xps-card-tile-description)');
    if (subtitle) content.appendChild(subtitle);
    // Title
    const title = element.querySelector('.xps-card-tile-title');
    if (title) content.appendChild(title);
    // Circle card (Tailored for...)
    const circleCard = element.querySelector('.xps-circle-card');
    if (circleCard) content.appendChild(circleCard);
    // Description paragraph
    const desc = element.querySelector('.xps-card-tile-description');
    if (desc) content.appendChild(desc);
    // CTA button
    const cta = element.querySelector('.xps-card-tile-button-wrapper');
    if (cta) content.appendChild(cta);
    return content;
  }

  // Build table rows
  const headerRow = ['Hero (hero14)'];

  // Row 2: Background image (optional)
  const bgImg = getBackgroundImage();
  const imageRow = [bgImg ? bgImg : ''];

  // Row 3: Main content block
  const mainContent = getMainContent();
  const contentRow = [mainContent];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
