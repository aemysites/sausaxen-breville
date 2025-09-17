/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a splide__slide
  function extractCard(slide) {
    // Find main image
    const img = slide.querySelector('.recipe-card__image');
    // Build text content
    const overlay = slide.querySelector('.recipe-card__overlay');
    if (!overlay) return null;
    // Title (h4)
    const titleEl = overlay.querySelector('.recipe-card__title > p');
    // Tag (e.g. Joule Oven)
    const tagEl = overlay.querySelector('.recipe-card__header .xps-tag span');
    // Chef info (avatar + name)
    const chefBox = overlay.querySelector('.recipe-card__footer .xps-partner-tag-box');
    // Compose text cell
    const textCell = document.createElement('div');
    // Add tag
    if (tagEl) {
      const tag = document.createElement('div');
      tag.textContent = tagEl.textContent;
      textCell.appendChild(tag);
    }
    // Add title
    if (titleEl) {
      const title = document.createElement('h4');
      title.textContent = titleEl.textContent;
      textCell.appendChild(title);
    }
    // Add chef info
    if (chefBox) {
      const chefAvatar = chefBox.querySelector('.xps-partner-tag-avatar-img');
      const chefName = chefBox.querySelector('.xps-partner-tag-title');
      const chefRow = document.createElement('div');
      if (chefAvatar) {
        const chefImg = chefAvatar.cloneNode(true);
        chefRow.appendChild(chefImg);
      }
      if (chefName) {
        const chefNameEl = document.createElement('span');
        chefNameEl.textContent = chefName.textContent;
        chefRow.appendChild(chefNameEl);
      }
      textCell.appendChild(chefRow);
    }
    return [img, textCell];
  }

  // Find the selected tab panel
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Find the carousel list of cards
  const carouselList = selectedPanel.querySelector('.splide__list');
  if (!carouselList) return;

  // Get all visible slides (cards)
  const slides = carouselList.querySelectorAll('.splide__slide');

  // Compose table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards11)'];
  rows.push(headerRow);

  // Add left panel info (title + description) as a card row
  const leftPanel = selectedPanel.querySelector('.xps-partner-tag-box');
  const leftDesc = selectedPanel.querySelector('.xps-card-tile-description');
  if (leftPanel || leftDesc) {
    const leftTextCell = document.createElement('div');
    // Only add avatar to first cell, not to text cell
    let icon = '';
    if (leftPanel) {
      const avatar = leftPanel.querySelector('.xps-partner-tag-avatar-img');
      if (avatar) icon = avatar.cloneNode(true);
      const title = leftPanel.querySelector('.xps-partner-tag-title');
      if (title) {
        const h3 = document.createElement('h3');
        h3.textContent = title.textContent;
        leftTextCell.appendChild(h3);
      }
    }
    if (leftDesc) {
      const desc = document.createElement('div');
      desc.textContent = leftDesc.textContent;
      leftTextCell.appendChild(desc);
    }
    rows.push([icon, leftTextCell]);
  }

  // For each card, extract info
  slides.forEach((slide) => {
    const card = extractCard(slide);
    if (card) {
      rows.push(card);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
