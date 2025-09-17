/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the selected tab panel (the visible content)
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the left panel (feature details)
  const featureDetails = selectedPanel.querySelector('.author_feature_details');
  // Find the right panel (cards)
  const cardContainer = selectedPanel.querySelector('.author_feature_card .xps-carousel-wrapper .splide__list');
  if (!featureDetails || !cardContainer) return;

  // Header row
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // Get the left panel content: Partner Chefs title, avatar, description
  // We'll use this for the first card
  const leftTagBox = featureDetails.querySelector('.xps-partner-tag-box');
  const leftAvatar = leftTagBox ? leftTagBox.querySelector('.xps-partner-tag-avatar-img') : null;
  const leftTitle = leftTagBox ? leftTagBox.querySelector('.xps-partner-tag-title') : null;
  const leftDesc = featureDetails.querySelector('.xps-card-tile-description');

  // Compose left panel card content
  const leftTextContent = document.createElement('div');
  if (leftTitle) leftTextContent.appendChild(leftTitle);
  if (leftDesc) leftTextContent.appendChild(leftDesc);

  // First row: left panel
  if (leftAvatar && leftTextContent.childNodes.length) {
    rows.push([leftAvatar, leftTextContent]);
  }

  // Now process each card in the carousel
  const cardSlides = cardContainer.querySelectorAll('.splide__slide');
  cardSlides.forEach((slide) => {
    // Find image
    const img = slide.querySelector('.recipe-card__image');
    // Find overlay content
    const overlay = slide.querySelector('.recipe-card__overlay');
    if (!img || !overlay) return;

    // Compose text content for the card
    const textContent = document.createElement('div');

    // Tag (e.g., Joule Oven, Smart Ovens)
    const tag = overlay.querySelector('.recipe-card__header .xps-tag');
    if (tag) textContent.appendChild(tag);

    // Title (h4)
    const title = overlay.querySelector('.recipe-card__title .xps-text-h4');
    if (title) textContent.appendChild(title);

    // Footer: chef avatar + name
    const footer = overlay.querySelector('.recipe-card__footer .xps-partner-tag-box');
    if (footer) textContent.appendChild(footer);

    rows.push([img, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
