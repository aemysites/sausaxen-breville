/* global WebImporter */
export default function parse(element, { document }) {
  // Find left (text) and right (media) columns
  let leftCol = element.querySelector('.xps-teaser__content');
  let rightCol = element.querySelector('.xps-teaser--media');

  // Fallbacks for robustness
  if (!leftCol) {
    leftCol = element.querySelector('.xps-card-tile-content-left') || element;
  }
  if (!rightCol) {
    rightCol = element.querySelector('.xps-teaser--media') || null;
  }

  // --- LEFT COLUMN: Gather all relevant content as a single block ---
  let leftContent = [];
  if (leftCol) {
    // Collect all direct children (to preserve structure and all text)
    leftContent = Array.from(leftCol.children);
    // If nothing found, fallback to leftCol itself
    if (leftContent.length === 0) leftContent = [leftCol];
  }

  // --- RIGHT COLUMN: Prefer video, else fallback to container (to preserve all content) ---
  let rightContent = [];
  if (rightCol) {
    // If there's a <video>, create a link to its src
    const video = rightCol.querySelector('video');
    if (video && video.src) {
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = video.src;
      rightContent.push(videoLink);
    } else {
      // Otherwise, include the entire rightCol block (to capture all possible media)
      rightContent = [rightCol];
    }
  }

  // Table header
  const headerRow = ['Columns block (columns2)'];
  // Table content row: two columns
  const contentRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
