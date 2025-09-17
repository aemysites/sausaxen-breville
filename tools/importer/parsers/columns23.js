/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Columns block (columns23)'];

  // Defensive: find the main splitteaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (!splitTeaser) return;

  // Find the left and right column containers
  const teaser = splitTeaser.querySelector('.teaser');
  if (!teaser) return;

  // Left column: media (video)
  let leftCol;
  const mediaWrapper = teaser.querySelector('.xps-teaser--media');
  if (mediaWrapper) {
    // Try to find a video element
    const video = mediaWrapper.querySelector('video');
    if (video && video.src) {
      // Create a figure with video thumbnail and link
      const figure = document.createElement('figure');
      // Use a screenshot placeholder image for video
      const img = document.createElement('img');
      img.src = 'https://breville.scene7.com/is/image/brevilleprod/breville-plus_home_split_teaser?fmt=png-alpha';
      img.alt = 'Video preview';
      img.width = 360;
      img.height = 240;
      figure.appendChild(img);
      // Link to video
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = 'Watch video';
      figure.appendChild(document.createElement('br'));
      figure.appendChild(videoLink);
      leftCol = figure;
    } else {
      // If no video, fallback to the mediaWrapper itself
      leftCol = mediaWrapper.cloneNode(true);
    }
  }

  // Right column: content (title, description, button)
  let rightCol;
  const contentWrapper = teaser.querySelector('.xps-teaser__content');
  if (contentWrapper) {
    // Collect all text content and button
    const frag = document.createDocumentFragment();
    // Title
    const title = contentWrapper.querySelector('.xps-card-tile-title');
    if (title) frag.appendChild(title.cloneNode(true));
    // Description
    const desc = contentWrapper.querySelector('.xps-card-tile-description');
    if (desc) frag.appendChild(desc.cloneNode(true));
    // Button
    const btn = contentWrapper.querySelector('.xps-card-tile-button-wrapper');
    if (btn) frag.appendChild(btn.cloneNode(true));
    rightCol = frag;
  }

  // If either column is missing, abort
  if (!leftCol || !rightCol) return;

  // Build the table rows
  const cells = [
    headerRow,
    [leftCol, rightCol],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
