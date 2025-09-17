/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the two main column elements
  // The left column: video
  // The right column: text content (h2, p, button)

  // Find the left column (video)
  let leftCol = null;
  let videoEl = null;
  // Try to find the video element
  videoEl = element.querySelector('video');
  if (videoEl) {
    // Wrap video in a div for better referencing
    leftCol = document.createElement('div');
    leftCol.appendChild(videoEl);
  }

  // Find the right column (content)
  let rightCol = null;
  // The content is inside .xps-card-tile-content-left
  const contentDiv = element.querySelector('.xps-card-tile-content-left');
  if (contentDiv) {
    rightCol = document.createElement('div');
    // Get the h2, description, and button
    const h2 = contentDiv.querySelector('h2');
    if (h2) rightCol.appendChild(h2);
    const desc = contentDiv.querySelector('.xps-card-tile-description');
    if (desc) rightCol.appendChild(desc);
    const btnWrap = contentDiv.querySelector('.xps-card-tile-button-wrapper');
    if (btnWrap) rightCol.appendChild(btnWrap);
  }

  // Build the table rows
  const headerRow = ['Columns block (columns23)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
