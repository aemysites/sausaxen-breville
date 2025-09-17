/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab list (ul.scrollable-tabs)
  const tabList = element.querySelector('ul.scrollable-tabs');
  if (!tabList) return;

  // Get all tab <li> elements
  const tabItems = Array.from(tabList.children).filter(li => li.getAttribute('role') === 'tab');
  if (!tabItems.length) return;

  // Build the table rows
  const rows = [];
  // Header row as specified
  rows.push(['Tabs (tabs16)']);

  // For each tab, extract the label (first cell) and an empty string for content (second cell)
  tabItems.forEach(li => {
    let label = '';
    const labelEl = li.querySelector('.xps-partner-tag-title');
    if (labelEl) {
      label = labelEl.textContent.trim();
    } else {
      label = li.textContent.trim();
    }
    rows.push([label, '']); // Always two columns per row
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
