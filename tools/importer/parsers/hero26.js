/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get background video src
  function getBackgroundVideoSrc(el) {
    const video = el.querySelector('video');
    if (video && video.src) {
      return video.src;
    }
    return null;
  }

  // Helper: Create a link element for video src
  function createVideoLink(src, document) {
    if (!src) return null;
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    return a;
  }

  // 1. Header row
  const headerRow = ['Hero (hero26)'];

  // 2. Background asset row (video as link)
  let backgroundAssetCell = '';
  const bgContainer = element.querySelector('.xps-herobanner-background-container');
  if (bgContainer) {
    const videoSrc = getBackgroundVideoSrc(bgContainer);
    if (videoSrc) {
      backgroundAssetCell = createVideoLink(videoSrc, document);
    }
  }
  const backgroundRow = [backgroundAssetCell || ''];

  // 3. Content row (title, subheading, CTAs)
  let contentCell = document.createElement('div');
  const contentGrid = element.querySelector('.xps-herobanner-content-grid');
  if (contentGrid) {
    // Find the main content container
    const cardTile = contentGrid.querySelector('.xps-card-tile');
    if (cardTile) {
      // Title
      const h1 = cardTile.querySelector('h1');
      if (h1) {
        const h1Clone = h1.cloneNode(true);
        contentCell.appendChild(h1Clone);
      }
      // Subheading
      const subheading = cardTile.querySelector('.xps-text-p1');
      if (subheading) {
        const subheadingClone = subheading.cloneNode(true);
        contentCell.appendChild(subheadingClone);
      }
      // CTAs
      const ctaWrapper = cardTile.querySelector('.xps-card-tile-button-wrapper');
      if (ctaWrapper) {
        // Only include the CTA links (not the wrapper)
        const ctas = Array.from(ctaWrapper.querySelectorAll('a'));
        if (ctas.length) {
          const ctaDiv = document.createElement('div');
          ctas.forEach(a => {
            const aClone = a.cloneNode(true);
            ctaDiv.appendChild(aClone);
          });
          contentCell.appendChild(ctaDiv);
        }
      }
    }
  }
  // If contentCell is empty, fallback to text content
  if (!contentCell.hasChildNodes()) {
    const fallbackText = element.textContent.trim();
    if (fallbackText) {
      contentCell.textContent = fallbackText;
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
