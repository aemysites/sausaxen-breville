/* global WebImporter */
export default function parse(element, { document }) {
  // Find the FAQ block
  const faqBlock = element.querySelector('.xps-faq');
  if (!faqBlock) return;

  // Table header row: must match target block name exactly
  const headerRow = ['Accordion (accordion28)'];
  const rows = [headerRow];

  // Find all accordion items
  const collapseItems = faqBlock.querySelectorAll('.rc-collapse-item');
  collapseItems.forEach((item) => {
    // Title cell: get the header text (usually in .rc-collapse-header-text)
    let titleCell = '';
    const headerTextSpan = item.querySelector('.rc-collapse-header-text');
    if (headerTextSpan) {
      const p = headerTextSpan.querySelector('p');
      titleCell = p ? p.textContent.trim() : headerTextSpan.textContent.trim();
    }
    // Content cell: try to get the content if present, otherwise omit the column
    let contentCell = undefined;
    const contentDiv = item.querySelector('.rc-collapse-content');
    if (contentDiv && contentDiv.textContent.trim()) {
      contentCell = contentDiv;
    }
    // Only push a second column if content exists, otherwise just the title
    if (typeof contentCell !== 'undefined') {
      rows.push([titleCell, contentCell]);
    } else {
      rows.push([titleCell]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
