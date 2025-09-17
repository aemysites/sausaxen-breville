/* global WebImporter */
export default function parse(element, { document }) {
  // Find the carousel track containing the slides
  const track = element.querySelector('.splide__track');
  if (!track) return;

  // Get all direct slide <li> elements (ignore clones)
  const slideEls = Array.from(track.querySelectorAll('.splide__list > li'))
    .filter(li => !li.classList.contains('splide__slide--clone'));

  // Table header row
  const headerRow = ['Carousel (carousel10)'];
  const rows = [headerRow];

  // For each slide, extract image (video poster or fallback image) and text content
  slideEls.forEach(slide => {
    // Left: .xps-teaser--media (contains video)
    // Right: .xps-teaser__content (contains text)
    const media = slide.querySelector('.xps-teaser--media');
    const content = slide.querySelector('.xps-teaser__content');

    // Find video element and use as image (poster or fallback to src as image)
    let mediaCell = '';
    if (media) {
      const video = media.querySelector('video');
      if (video && video.src) {
        // Use video poster if available, otherwise use src as image
        let imgEl = document.createElement('img');
        if (video.poster) {
          imgEl.src = video.poster;
        } else {
          imgEl.src = video.src;
        }
        imgEl.alt = '';
        mediaCell = imgEl;
      }
    }
    if (!mediaCell) mediaCell = '';

    // Text content cell: Extract all text content (title, description, etc.)
    let textCell = '';
    if (content) {
      // Clone content so we can safely manipulate
      const contentClone = content.cloneNode(true);
      // Remove any empty or irrelevant elements (optional)
      // Get all text including headings and paragraphs
      textCell = Array.from(contentClone.childNodes).map(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          return node;
        } else if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          return text ? document.createTextNode(text) : null;
        }
        return null;
      }).filter(Boolean);
      // If only one element, don't wrap in array
      if (textCell.length === 1) textCell = textCell[0];
    }

    rows.push([mediaCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
