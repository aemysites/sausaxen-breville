/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing the slides
  const track = element.querySelector('.splide__track');
  if (!track) return;

  // Get all direct slide elements (li.splide__slide) inside the carousel
  const slides = track.querySelectorAll('ul.splide__list > li.splide__slide');
  if (!slides.length) return;

  // Table header row
  const headerRow = ['Carousel (carousel10)'];
  const rows = [headerRow];

  // To avoid duplicate slides (clones), keep track of unique slide keys
  const seen = new Set();

  slides.forEach((slide) => {
    // Use the item_X class as a unique key
    const itemClass = Array.from(slide.querySelectorAll('[class*="item_"]'))
      .map(el => Array.from(el.classList).find(c => c.startsWith('item_')))
      .find(Boolean);
    if (itemClass && seen.has(itemClass)) return;
    if (itemClass) seen.add(itemClass);

    // Find image or video in left column
    let mediaEl = null;
    const mediaWrapper = slide.querySelector('.xps-teaser--media');
    if (mediaWrapper) {
      // Try to find an image
      const img = mediaWrapper.querySelector('img');
      if (img) {
        mediaEl = img.cloneNode(true);
      } else {
        // Try to find a video
        const videoEl = mediaWrapper.querySelector('video');
        if (videoEl && videoEl.src) {
          // Use the video src as an image (mandatory for carousel block)
          const imgEl = document.createElement('img');
          imgEl.src = videoEl.src;
          imgEl.alt = '';
          mediaEl = imgEl;
        }
      }
    }

    // Only add rows with a valid image in the first cell
    if (!mediaEl) return;

    // Find text content in right column
    let textContent = null;
    const contentWrapper = slide.querySelector('.xps-teaser__content');
    if (contentWrapper) {
      // Instead of just h3 and p, include all direct children of contentWrapper
      const cellEls = [];
      Array.from(contentWrapper.children).forEach(child => {
        cellEls.push(child.cloneNode(true));
      });
      if (cellEls.length) textContent = cellEls;
    }

    // Always 2 columns: [media, text]
    rows.push([
      mediaEl,
      textContent || ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
