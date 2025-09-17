/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main splitteaser block
  let splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) splitTeaser = element;

  // Left column: content
  let leftContent;
  const teaserContent = splitTeaser.querySelector('.xps-teaser__content');
  if (teaserContent) {
    leftContent = teaserContent;
  } else {
    // fallback: grab first child div
    leftContent = splitTeaser.children[0];
  }

  // Right column: image
  let rightContent;
  const teaserMedia = splitTeaser.querySelector('.xps-teaser--media');
  if (teaserMedia) {
    rightContent = teaserMedia;
  } else {
    // fallback: find first img
    const img = splitTeaser.querySelector('img');
    if (img) {
      rightContent = img;
    } else {
      rightContent = document.createElement('div'); // empty
    }
  }

  // Table header
  const headerRow = ['Columns block (columns22)'];
  // Table content row: left and right columns
  const contentRow = [leftContent, rightContent];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
