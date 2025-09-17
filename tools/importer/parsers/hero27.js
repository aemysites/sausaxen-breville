/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract background video src
  function getBackgroundVideoSrc(el) {
    const video = el.querySelector('video');
    return video && video.src ? video.src : null;
  }

  // Helper to create a background image from video src
  function createImageFromVideoSrc(src) {
    if (!src) return null;
    const img = document.createElement('img');
    img.src = src;
    // Optionally, set a default width/height if desired
    img.setAttribute('loading', 'lazy');
    return img;
  }

  // Find background video container
  const bgContainer = element.querySelector('.xps-herobanner-background-container');
  let bgAsset = null;
  if (bgContainer) {
    const videoSrc = getBackgroundVideoSrc(bgContainer);
    if (videoSrc) {
      // Use video src as image for block background
      bgAsset = createImageFromVideoSrc(videoSrc);
    }
  }

  // Find the headline/title
  let title = null;
  const titleEl = element.querySelector('h1');
  if (titleEl) {
    title = titleEl;
  }

  // Compose table rows
  const headerRow = ['Hero (hero27)'];
  const imageRow = [bgAsset ? bgAsset : ''];
  const contentRow = [title ? title : ''];

  const cells = [headerRow, imageRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
