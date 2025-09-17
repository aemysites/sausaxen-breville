/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background asset (video or image)
  function getBackgroundAsset(el) {
    const video = el.querySelector('video');
    if (video && video.src) {
      // For videos, create a link to the video src
      const link = document.createElement('a');
      link.href = video.src;
      link.textContent = video.src;
      return link;
    }
    const img = el.querySelector('img');
    if (img) {
      return img;
    }
    return '';
  }

  // Extract all text content from the content block
  function getContentBlock(el) {
    const contentContainer = el.querySelector('.xps-herobanner-content-container');
    if (!contentContainer) return '';
    // Collect all text nodes and relevant elements
    const fragment = document.createDocumentFragment();
    // Subheading (h6)
    const h6 = contentContainer.querySelector('h6');
    if (h6) fragment.appendChild(h6.cloneNode(true));
    // Heading (h1)
    const h1 = contentContainer.querySelector('h1');
    if (h1) fragment.appendChild(h1.cloneNode(true));
    // CTA button (span/button)
    const btnWrapper = contentContainer.querySelector('.xps-card-tile-button-wrapper');
    if (btnWrapper) {
      const btn = btnWrapper.querySelector('button');
      if (btn) {
        const btnText = btn.querySelector('span');
        const video = element.querySelector('video');
        let href = video && video.src ? video.src : '#';
        const link = document.createElement('a');
        link.href = href;
        link.textContent = btnText ? btnText.textContent : btn.textContent;
        fragment.appendChild(link);
      }
    }
    // If no children, fallback to all text content
    if (!fragment.childNodes.length) {
      fragment.appendChild(document.createTextNode(contentContainer.textContent.trim()));
    }
    // Wrap fragment in a div
    const div = document.createElement('div');
    div.appendChild(fragment);
    return div;
  }

  // Build table rows
  const headerRow = ['Hero (hero25)'];
  const bgContainer = element.querySelector('.xps-herobanner-background-container');
  const backgroundRow = [bgContainer ? getBackgroundAsset(bgContainer) : ''];
  const contentRow = [getContentBlock(element)];
  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
