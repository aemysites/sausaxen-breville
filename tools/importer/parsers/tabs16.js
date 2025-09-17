/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul class="scrollable-tabs"> inside the block
  const tabsList = element.querySelector('ul.scrollable-tabs');
  if (!tabsList) return;

  // Get all <li> elements (each tab)
  const tabItems = Array.from(tabsList.children).filter((li) => li.getAttribute('role') === 'tab');

  // Prepare the table rows
  const rows = [];
  // Header row as required
  const headerRow = ['Tabs (tabs16)'];
  rows.push(headerRow);

  // For each tab, extract the label and add an empty string for tab content (2 columns per row)
  tabItems.forEach((li) => {
    let label = '';
    const labelEl = li.querySelector('.xps-partner-tag-title');
    if (labelEl) {
      label = labelEl.textContent.trim();
    } else {
      label = li.textContent.trim();
    }
    // Always output two columns: label and content (empty string for content)
    rows.push([label, '']);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
