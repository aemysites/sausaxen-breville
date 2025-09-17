/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a given element by selector
  function getImmediateChildBySelector(parent, selector) {
    return Array.from(parent.children).find(child => child.matches(selector));
  }

  // 1. Find the two column containers: left (image), right (content)
  // The structure is: .split-teaser-wrapper > .grid-container-fluid > .grid-container > .xps-splitteaser > .teaser > .xps-teaser.left.width-50.center
  // Inside .xps-teaser.left.width-50.center:
  //   - .xps-teaser--media (image)
  //   - .xps-teaser__content (content)

  // Defensive: find the deepest .xps-teaser.left.width-50.center
  const teaser = element.querySelector('.xps-teaser.left.width-50.center');
  if (!teaser) return;

  // Left column: image/media
  const media = getImmediateChildBySelector(teaser, '.xps-teaser--media');
  let leftContent = null;
  if (media) {
    // Find the first <img> inside media
    const img = media.querySelector('img');
    if (img) {
      leftContent = img;
    }
  }

  // Right column: content
  const content = getImmediateChildBySelector(teaser, '.xps-teaser__content');
  let rightContent = null;
  if (content) {
    // Use the entire content block (includes h2, p, button)
    rightContent = content;
  }

  // Build the table rows
  const headerRow = ['Columns block (columns1)'];
  const columnsRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
