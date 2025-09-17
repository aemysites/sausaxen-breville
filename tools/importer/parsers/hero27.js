/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the background asset (image or video)
  let backgroundAsset = null;

  // Try to find a video element inside the hero banner
  const video = element.querySelector('video');
  if (video && video.src) {
    // For non-image assets, create a link to the src
    const videoLink = document.createElement('a');
    videoLink.href = video.src;
    videoLink.textContent = video.src;
    backgroundAsset = videoLink;
  }

  // If no video, try to find an image (not present in this HTML, but for robustness)
  if (!backgroundAsset) {
    const img = element.querySelector('img');
    if (img) {
      backgroundAsset = img;
    }
  }

  // Helper: Find the headline/title and any additional text content
  let contentCell = [];
  const h1 = element.querySelector('h1');
  if (h1) {
    contentCell.push(h1);
  }

  // Find additional text nodes (subheadings, paragraphs, etc.) that are visually part of the hero content
  // We'll grab all elements inside .xps-herobanner-content-container except h1
  const contentContainer = element.querySelector('.xps-herobanner-content-container');
  if (contentContainer) {
    const extraContent = Array.from(contentContainer.querySelectorAll('*'))
      .filter(el => el !== h1 && (el.tagName.startsWith('H') || el.tagName === 'P'));
    contentCell = contentCell.concat(extraContent);
  }

  // If no extra content found, ensure at least headline is present
  if (contentCell.length === 0 && h1) {
    contentCell = [h1];
  }

  // Compose the table rows
  const headerRow = ['Hero (hero27)'];
  const backgroundRow = [backgroundAsset ? backgroundAsset : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, backgroundRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
