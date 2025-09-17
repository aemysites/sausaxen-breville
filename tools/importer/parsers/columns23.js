/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main splitteaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find the left (media) and right (content) columns
  const teaser = splitTeaser.querySelector('.xps-teaser.left');
  if (!teaser) return;

  // Left column: media
  const leftMedia = teaser.querySelector('.xps-teaser--media');
  let leftCol;
  if (leftMedia) {
    // If leftMedia contains a video, replace with a link to its src
    const video = leftMedia.querySelector('video');
    if (video && video.src) {
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = video.src;
      leftCol = document.createElement('div');
      leftCol.appendChild(videoLink);
    } else {
      leftCol = leftMedia.cloneNode(true);
    }
  } else {
    leftCol = document.createElement('div');
  }

  // Right column: content (include all text content)
  const rightContent = teaser.querySelector('.xps-teaser__content');
  let rightCol;
  if (rightContent) {
    // Collect all headings, paragraphs, and buttons
    rightCol = document.createElement('div');
    // Heading
    const heading = rightContent.querySelector('.xps-card-tile-title');
    if (heading) rightCol.appendChild(heading.cloneNode(true));
    // Description
    const desc = rightContent.querySelector('.xps-card-tile-description');
    if (desc) rightCol.appendChild(desc.cloneNode(true));
    // Button
    const btn = rightContent.querySelector('.xps-card-tile-button-wrapper');
    if (btn) rightCol.appendChild(btn.cloneNode(true));
  } else {
    rightCol = document.createElement('div');
  }

  // Table header row
  const headerRow = ['Columns block (columns23)'];
  // Table content row: [left column, right column]
  const contentRow = [leftCol, rightCol];

  // Build table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element
  element.replaceWith(table);
}
