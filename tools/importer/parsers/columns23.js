/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row: must be exactly one column
  const headerRow = ['Columns block (columns23)'];

  // Find the two main columns: left (media), right (content)
  const teaser = element.querySelector('.xps-teaser');
  if (!teaser) return;

  // Left column: media (video or image)
  let leftCell = '';
  const mediaWrapper = teaser.querySelector('.xps-teaser--media');
  if (mediaWrapper) {
    // Look for video
    const video = mediaWrapper.querySelector('video');
    if (video) {
      const src = video.getAttribute('src');
      if (src) {
        // Create an <a> containing an <img> as a video preview
        const a = document.createElement('a');
        a.href = src;
        a.target = '_blank';
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Video preview';
        img.style.maxWidth = '100%';
        a.appendChild(img);
        leftCell = a;
      }
    } else {
      // If image present, use it
      const img = mediaWrapper.querySelector('img');
      if (img) {
        leftCell = img;
      } else {
        // If neither, use the mediaWrapper itself
        leftCell = mediaWrapper.cloneNode(true);
      }
    }
  }
  if (!leftCell) leftCell = document.createTextNode('');

  // Right column: content
  let rightCell = '';
  const contentWrapper = teaser.querySelector('.xps-teaser__content');
  if (contentWrapper) {
    // Instead of cloning, extract all text content and button
    const fragments = [];
    // Title
    const title = contentWrapper.querySelector('.xps-card-tile-title');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title.textContent;
      fragments.push(h2);
    }
    // Description
    const desc = contentWrapper.querySelector('.xps-card-tile-description');
    if (desc) {
      const p = desc.querySelector('p');
      if (p) {
        const pElem = document.createElement('p');
        pElem.textContent = p.textContent;
        fragments.push(pElem);
      }
    }
    // Button
    const btn = contentWrapper.querySelector('.xps-card-tile-button-wrapper a');
    if (btn) {
      const a = document.createElement('a');
      a.href = btn.href;
      a.textContent = btn.textContent.trim();
      a.target = '_blank';
      fragments.push(a);
    }
    rightCell = fragments;
  }
  if (!rightCell || (Array.isArray(rightCell) && rightCell.length === 0)) rightCell = document.createTextNode('');

  // Build table: header row must be single column
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCell, rightCell],
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
