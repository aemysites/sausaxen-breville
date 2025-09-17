/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the tab list
  const tabList = element.querySelector('ul.scrollable-tabs');
  if (!tabList) return;

  // Get all tab <li> elements
  const tabItems = Array.from(tabList.children).filter(li => li.getAttribute('role') === 'tab');

  // Table header: block name only (one column)
  const headerRow = ['Tabs (tabs16)'];
  const rows = [headerRow];

  // Each tab row: two columns (label, content)
  tabItems.forEach(li => {
    let label = '';
    const labelEl = li.querySelector('.xps-partner-tag-title');
    if (labelEl) {
      label = labelEl.textContent.trim();
    } else {
      label = li.textContent.trim();
    }
    // Per block spec, always provide two columns: label, content (only if content exists)
    // But in this HTML, there is no tab content, so omit the second column
    rows.push([label]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
