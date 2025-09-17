/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tabs list
  const tabsList = element.querySelector('ul.scrollable-tabs');
  if (!tabsList) return;

  // Table header row
  const headerRow = ['Tabs (tabs16)'];
  const rows = [headerRow];

  // Each tab is a <li> with label inside <p.xps-partner-tag-title>
  const tabItems = tabsList.querySelectorAll(':scope > li');
  tabItems.forEach((li) => {
    // Find the tab label
    const labelEl = li.querySelector('.xps-partner-tag-title');
    let label = labelEl ? labelEl.textContent.trim() : '';
    // For tabs block, tab content is mandatory (second column), but not present in HTML, so use an empty string for content
    rows.push([label, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
