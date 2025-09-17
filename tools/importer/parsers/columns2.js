/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: create a link for video src
  function createVideoLink(videoEl) {
    const src = videoEl.getAttribute('src');
    if (!src) return null;
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    return a;
  }

  // Extract left column: heading, description, button
  let leftCol = document.createElement('div');
  const teaserContent = element.querySelector('.xps-teaser__content');
  if (teaserContent) {
    // Instead of appending the node itself, clone its children for flexibility
    Array.from(teaserContent.children).forEach(child => {
      leftCol.appendChild(child.cloneNode(true));
    });
  }

  // Extract right column: video
  let rightCol = document.createElement('div');
  const mediaWrapper = element.querySelector('.xps-teaser--media');
  if (mediaWrapper) {
    const videoEl = mediaWrapper.querySelector('video');
    if (videoEl) {
      const videoLink = createVideoLink(videoEl);
      if (videoLink) rightCol.appendChild(videoLink);
    }
  }

  // Table header: block name EXACTLY
  const headerRow = ['Columns block (columns2)'];
  // Table row: left and right columns
  const row = [leftCol, rightCol];

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  // Replace element with table
  element.replaceWith(table);
}
