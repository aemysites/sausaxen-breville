/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab list
  const tabList = element.querySelector('ul.scrollable-tabs');
  if (!tabList) return;

  // Get all tab <li> elements
  const tabItems = Array.from(tabList.children).filter(li => li.getAttribute('role') === 'tab');

  // Prepare table rows
  const rows = [];
  // Required header row (single cell)
  rows.push(['Tabs (tabs16)']);

  // For each tab, extract label and add empty string for content (2 columns per row)
  tabItems.forEach(tab => {
    let label = '';
    const labelEl = tab.querySelector('.xps-partner-tag-title');
    if (labelEl) {
      label = labelEl.textContent.trim();
    } else {
      label = tab.textContent.trim();
    }
    rows.push([label, '']);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
