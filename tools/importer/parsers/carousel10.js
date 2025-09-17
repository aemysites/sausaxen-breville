/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel slides container
  const slidesList = element.querySelector('.splide__list');
  if (!slidesList) return;

  // Helper to extract image or video as <img>
  function extractMedia(slideEl) {
    // Try to find an <img> first
    const img = slideEl.querySelector('img');
    if (img) return img;
    // If no image, try to find a <video>
    const video = slideEl.querySelector('video');
    if (video && video.src) {
      // Create an <img> element with the video poster if available, else use the video src as fallback
      const poster = video.getAttribute('poster');
      const src = poster || video.src;
      if (src) {
        const imgEl = document.createElement('img');
        imgEl.src = src;
        return imgEl;
      }
    }
    // If neither found, fallback: return null
    return null;
  }

  // Helper to extract all text content (title, description, CTA)
  function extractTextContent(slideEl) {
    // Get the main content wrapper
    const content = slideEl.querySelector('.xps-teaser__content') || slideEl.querySelector('.xps-card-tile');
    if (!content) return '';
    // Clone the content node to avoid mutating the DOM
    const contentClone = content.cloneNode(true);
    // Remove any media elements from the clone
    const mediaEls = contentClone.querySelectorAll('img, video');
    mediaEls.forEach(el => el.remove());
    // Return the full block of content (preserves heading, description, CTA)
    return contentClone;
  }

  // Only use real slides (not clones)
  const slideEls = Array.from(slidesList.children)
    .filter(li => li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone'));

  // Table header row
  const headerRow = ['Carousel (carousel10)'];
  const rows = [headerRow];

  // For each slide, extract media and text content
  slideEls.forEach(slideEl => {
    // Defensive: find the main teaser wrapper
    const teaser = slideEl.querySelector('.teaser, .xps-teaser');
    const mediaCell = extractMedia(teaser || slideEl);
    const textCell = extractTextContent(teaser || slideEl);
    rows.push([
      mediaCell || '',
      textCell || ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
