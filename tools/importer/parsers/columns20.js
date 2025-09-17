/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row per spec
  const headerRow = ['Columns block (columns20)'];

  // Find all immediate column divs (each col-lg-2 etc)
  const colDivs = Array.from(element.querySelectorAll(':scope > .row > div'));

  // For each column, extract its main content (the circle card)
  // We'll reference the whole col div for resilience
  const contentRow = colDivs.map(col => col);

  // Compose the table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
