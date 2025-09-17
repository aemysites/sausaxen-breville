/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link for non-image media (e.g. video)
  function createLinkFromSrc(src, text = 'View Video') {
    const a = document.createElement('a');
    a.href = src;
    a.textContent = text;
    a.target = '_blank';
    return a;
  }

  // Defensive selectors for left and right columns
  let leftColContent = null;
  let rightColContent = null;

  // Find the main splitteaser block
  const splitTeaser = element.querySelector('.xps-splitteaser');
  if (splitTeaser) {
    // Find the left and right teaser columns
    const teasers = splitTeaser.querySelectorAll('.xps-teaser');
    if (teasers.length > 0) {
      // LEFT COLUMN: media (video)
      const leftTeaser = teasers[0];
      const mediaWrapper = leftTeaser.querySelector('.xps-teaser--media');
      if (mediaWrapper) {
        // Look for video
        const video = mediaWrapper.querySelector('video');
        if (video && video.src) {
          leftColContent = createLinkFromSrc(video.src, 'View Video');
        }
      }
      // If no video, fallback to entire mediaWrapper
      if (!leftColContent && mediaWrapper) {
        leftColContent = mediaWrapper;
      }
      // Defensive fallback
      if (!leftColContent) {
        leftColContent = leftTeaser;
      }

      // RIGHT COLUMN: content (title, description, button)
      const contentWrapper = leftTeaser.querySelector('.xps-teaser__content');
      if (contentWrapper) {
        rightColContent = contentWrapper;
      } else {
        // Defensive fallback: try the next teaser if present
        if (teasers.length > 1) {
          rightColContent = teasers[1];
        }
      }
    }
  }

  // Fallbacks if parsing fails
  if (!leftColContent) {
    leftColContent = document.createElement('div');
    leftColContent.textContent = '';
  }
  if (!rightColContent) {
    rightColContent = document.createElement('div');
    rightColContent.textContent = '';
  }

  // Table structure: header, then one row with two columns
  const headerRow = ['Columns block (columns23)'];
  const contentRow = [leftColContent, rightColContent];
  const cells = [headerRow, contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
