/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel track (contains all slides)
  const track = element.querySelector('.splide__track');
  if (!track) return;
  const list = track.querySelector('.splide__list');
  if (!list) return;

  // Get all real slides (ignore clones)
  const slides = Array.from(list.children).filter(li => {
    // Only include non-clone slides
    return li.classList.contains('splide__slide') && !li.classList.contains('splide__slide--clone');
  });

  const rows = [];
  // Header row
  const headerRow = ['Carousel (carousel10)'];
  rows.push(headerRow);

  slides.forEach(slide => {
    // Defensive: find teaser wrapper (holds image/video and content)
    const teaser = slide.querySelector('.teaser');
    if (!teaser) return;

    // --- First cell: Image (mandatory) ---
    let mediaCell = '';
    // Try to find an image
    const img = teaser.querySelector('img');
    if (img) {
      mediaCell = img;
    } else {
      // Try to find a video and use its thumbnail if available, else fallback to video src as image
      const video = teaser.querySelector('video');
      if (video && video.src) {
        // Use video src as image src
        const videoImg = document.createElement('img');
        videoImg.src = video.src;
        mediaCell = videoImg;
      }
    }
    // If neither found, leave cell empty
    if (!mediaCell) mediaCell = '';

    // --- Second cell: Text content ---
    let textCell = '';
    // Grab the full .xps-teaser__content block for flexibility
    const content = teaser.querySelector('.xps-teaser__content');
    if (content) {
      // Clone the content node to avoid removing it from the DOM
      textCell = content.cloneNode(true);
    }

    rows.push([mediaCell, textCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
