/* global WebImporter */
export default function parse(element, { document }) {
  // Find the left and right columns more flexibly
  let leftCol = null;
  let rightCol = null;

  // Try to find the left column: look for the largest content block with text
  leftCol = element.querySelector('.xps-teaser__content')
    || element.querySelector('.xps-card-tile-content-left')
    || element.querySelector('.xps-card-tile');

  // Try to find the right column: look for media wrapper or direct image/video
  rightCol = element.querySelector('.xps-teaser--media')
    || element.querySelector('.xps-vp-hover-wrapper')
    || element.querySelector('.aspect-ratio');

  // Defensive fallback: if not found, try direct children
  if (!leftCol || !rightCol) {
    const directDivs = Array.from(element.querySelectorAll(':scope > div'));
    if (!leftCol && directDivs.length > 0) leftCol = directDivs[0];
    if (!rightCol && directDivs.length > 1) rightCol = directDivs[1];
  }

  // Ensure leftCol includes all relevant text and button
  let leftCell;
  if (leftCol) {
    leftCell = document.createElement('div');
    // Grab heading
    const heading = leftCol.querySelector('h2');
    if (heading) leftCell.appendChild(heading.cloneNode(true));
    // Grab description
    const desc = leftCol.querySelector('.xps-card-tile-description, p');
    if (desc) leftCell.appendChild(desc.cloneNode(true));
    // Grab button
    const btn = leftCol.querySelector('a');
    if (btn) leftCell.appendChild(btn.cloneNode(true));
  } else {
    leftCell = '';
  }

  // Ensure rightCol includes the video as a link
  let rightCell;
  if (rightCol) {
    rightCell = document.createElement('div');
    // Look for video
    const video = rightCol.querySelector('video[src]');
    if (video) {
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = video.src;
      rightCell.appendChild(videoLink);
    } else {
      // If not video, include any image or fallback content
      const img = rightCol.querySelector('img');
      if (img) rightCell.appendChild(img.cloneNode(true));
    }
  } else {
    rightCell = '';
  }

  // Table header
  const headerRow = ['Columns block (columns2)'];
  // Table content row
  const contentRow = [leftCell, rightCell];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
