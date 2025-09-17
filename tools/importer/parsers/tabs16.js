/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab list (ul.scrollable-tabs)
  const tabList = element.querySelector('ul.scrollable-tabs');
  if (!tabList) return;

  // Get all tab <li> elements
  const tabItems = Array.from(tabList.children).filter(li => li.getAttribute('role') === 'tab');

  // Table header row: must be a single cell
  const headerRow = ['Tabs (tabs16)'];
  const rows = [headerRow];

  // Each tab row: [label, content] (content is empty string if not present)
  tabItems.forEach(tab => {
    let label = '';
    const labelEl = tab.querySelector('.xps-partner-tag-title');
    if (labelEl) {
      label = labelEl.textContent.trim();
    } else {
      label = tab.textContent.trim();
    }
    // Always create two columns: label and content (content is empty string if not present)
    rows.push([label, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
