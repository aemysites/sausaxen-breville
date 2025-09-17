/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Find the FAQ column containing the accordion
  const faqCol = Array.from(element.querySelectorAll(':scope > div.row > div')).find(
    (col) => col.querySelector('.xps-faq')
  );
  if (!faqCol) return;

  const faqBlock = faqCol.querySelector('.xps-faq');
  if (!faqBlock) return;

  // Find all accordion items
  const items = Array.from(faqBlock.querySelectorAll('.rc-collapse-item'));

  // Table header: must match block name exactly
  const headerRow = ['Accordion (accordion28)'];
  const rows = [headerRow];

  // For each accordion item, extract title and content (content cell should exist, even if empty)
  items.forEach((item) => {
    // Title cell: The header text (usually a <p> inside .rc-collapse-header-text)
    let titleCell = '';
    const headerTextSpan = item.querySelector('.rc-collapse-header-text');
    if (headerTextSpan) {
      const p = headerTextSpan.querySelector('p');
      titleCell = p ? p : headerTextSpan;
    }

    // Content cell: The body of the accordion (if present)
    let contentCell = '';
    // Try to find .rc-collapse-content or .rc-collapse-panel
    const contentDiv = item.querySelector('.rc-collapse-content, .rc-collapse-panel');
    if (contentDiv) {
      // Use all children as content (could be empty, but structure is correct)
      contentCell = Array.from(contentDiv.childNodes);
    }

    rows.push([
      titleCell,
      contentCell,
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
