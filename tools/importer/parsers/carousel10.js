/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create an <img> from a video src
  function createVideoImg(videoEl) {
    if (!videoEl || !videoEl.src) return '';
    const img = document.createElement('img');
    img.src = videoEl.src;
    img.alt = '';
    return img;
  }

  // Find all real slides (ignore clones)
  const slides = Array.from(
    element.querySelectorAll('.splide__slide')
  ).filter(slide => !slide.classList.contains('splide__slide--clone'));

  // Table header must match block name exactly
  const headerRow = ['Carousel (carousel10)'];
  const rows = [headerRow];

  slides.forEach(slide => {
    // Find the left media (video)
    let imageCell = '';
    const videoEl = slide.querySelector('.xps-teaser--media video');
    if (videoEl) {
      imageCell = createVideoImg(videoEl);
    }

    // Find the right content
    let contentCell = '';
    const content = slide.querySelector('.xps-teaser__content');
    if (content) {
      // Instead of targeting only heading/desc, grab all content
      // This ensures all text is included
      const cellContent = Array.from(content.childNodes)
        .filter(node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()))
        .map(node => node.cloneNode(true));
      if (cellContent.length) contentCell = cellContent;
    }

    rows.push([
      imageCell,
      contentCell || ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
