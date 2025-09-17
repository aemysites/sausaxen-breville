/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract left (text) and right (media) columns
  const leftContent = element.querySelector('.xps-teaser__content');
  const rightContent = element.querySelector('.xps-teaser--media');

  // Defensive: Ensure both columns exist
  if (!leftContent || !rightContent) return;

  // 2. For the right column, if it contains a <video>, replace it with an <img> using a representative poster (not available here), or leave as-is (per requirements, keep all content in a cell)
  // In this case, we leave the <video> as is, since there's no poster or fallback image, and the block expects all content.

  // 3. Table header row: must match block name exactly
  const headerRow = ['Columns block (columns2)'];
  // 4. Table content row: left and right columns
  const contentRow = [leftContent, rightContent];

  // 5. Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // 6. Replace the original element with the new block
  element.replaceWith(table);
}
