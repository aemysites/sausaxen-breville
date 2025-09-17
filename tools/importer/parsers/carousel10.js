/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all real slides (not clones)
  function getSlides(el) {
    const track = el.querySelector('.splide__track');
    if (!track) return [];
    const list = track.querySelector('.splide__list');
    if (!list) return [];
    // Only select non-clone slides
    return Array.from(list.children).filter(li => {
      return !li.classList.contains('splide__slide--clone');
    });
  }

  // Helper to extract video as an <img> element
  function extractVideoImage(slide) {
    const video = slide.querySelector('video');
    if (video && video.src) {
      const img = document.createElement('img');
      img.src = video.src;
      img.alt = '';
      return img;
    }
    return '';
  }

  // Helper to extract text content (preserving semantic HTML)
  function extractTextContent(slide) {
    const content = slide.querySelector('.xps-teaser__content');
    if (!content) return '';
    // Clone the content node to preserve all text and structure
    return content.cloneNode(true);
  }

  // Build the table rows
  const headerRow = ['Carousel (carousel10)'];
  const rows = [headerRow];

  const slides = getSlides(element);
  slides.forEach(slide => {
    const leftCell = extractVideoImage(slide);
    const rightCell = extractTextContent(slide);
    rows.push([leftCell, rightCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
