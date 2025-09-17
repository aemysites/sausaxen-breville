/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate child divs
  const childDivs = Array.from(element.querySelectorAll(':scope > div'));

  // --- 1. HEADER ROW ---
  const headerRow = ['Hero (hero25)'];

  // --- 2. BACKGROUND ASSET ROW ---
  // Find video element (background asset)
  let backgroundAssetCell = '';
  const bgContainer = childDivs.find(div => div.className && div.className.includes('xps-herobanner-background-container'));
  if (bgContainer) {
    // Look for <video> inside
    const video = bgContainer.querySelector('video');
    if (video && video.src) {
      // Create a link to the video src
      const videoLink = document.createElement('a');
      videoLink.href = video.src;
      videoLink.textContent = video.src;
      backgroundAssetCell = videoLink;
    }
  }
  // If no video, leave cell empty
  const backgroundRow = [backgroundAssetCell];

  // --- 3. CONTENT ROW ---
  // Find content container
  let contentCell = '';
  const contentGrid = childDivs.find(div => div.className && div.className.includes('xps-herobanner-content-grid'));
  if (contentGrid) {
    // Get the main content area (usually a column div)
    const colDiv = contentGrid.querySelector('.col-lg-8, .col-md-12, .col-sm-12');
    if (colDiv) {
      const contentContainer = colDiv.querySelector('.xps-herobanner-content-container');
      if (contentContainer) {
        // The inner tile holds headings and button
        const tile = contentContainer.querySelector('.xps-card-tile');
        if (tile) {
          // Gather heading, subheading, and CTA
          // Use less specific selectors to ensure all text is captured
          const heading = tile.querySelector('h1, .xps-text-h1-giant');
          const subheading = tile.querySelector('h6, .xps-text-h6');
          // Find CTA button
          let cta = '';
          const button = tile.querySelector('button');
          if (button) {
            // Extract button text
            let btnText = '';
            const span = button.querySelector('span');
            if (span) {
              btnText = span.textContent;
            } else {
              btnText = button.textContent;
            }
            // Link to video src if available
            let btnLink = null;
            const video = bgContainer?.querySelector('video');
            if (video && video.src) {
              btnLink = document.createElement('a');
              btnLink.href = video.src;
              btnLink.textContent = btnText;
            } else {
              btnLink = document.createElement('span');
              btnLink.textContent = btnText;
            }
            cta = btnLink;
          }
          // Compose content cell: ensure all text content is included
          const contentParts = [];
          if (subheading) contentParts.push(subheading.cloneNode(true));
          if (heading) contentParts.push(heading.cloneNode(true));
          if (cta) contentParts.push(cta);
          contentCell = contentParts;
        }
      }
    }
  }
  const contentRow = [contentCell];

  // --- Assemble table and replace ---
  const cells = [headerRow, backgroundRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
