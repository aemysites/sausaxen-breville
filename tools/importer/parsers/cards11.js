/* global WebImporter */
export default function parse(element, { document }) {
  // Find the selected tab panel (visible content)
  const selectedPanel = element.querySelector('.react-tabs__tab-panel--selected');
  if (!selectedPanel) return;

  // Get the main feature details section
  const featureDetails = selectedPanel.querySelector('.author_feature_details');
  if (!featureDetails) return;

  // Get the card carousel
  const carousel = featureDetails.querySelector('.xps-carousel-wrapper');
  if (!carousel) return;

  // Find all cards (li.splide__slide)
  const cardEls = carousel.querySelectorAll('li.splide__slide');

  // Build header row
  const headerRow = ['Cards (cards11)'];
  const rows = [headerRow];

  // For each card, extract image and full text content
  cardEls.forEach(cardEl => {
    // Defensive: find image
    const img = cardEl.querySelector('img.recipe-card__image');
    // Defensive: find overlay
    const overlay = cardEl.querySelector('.recipe-card__overlay');
    let textContent = document.createElement('div');

    if (overlay) {
      // Subtitle (header tag)
      const subtitleTag = overlay.querySelector('.recipe-card__header .xps-tag span');
      if (subtitleTag) {
        const subtitle = document.createElement('strong');
        subtitle.textContent = subtitleTag.textContent.trim();
        textContent.appendChild(subtitle);
        textContent.appendChild(document.createElement('br'));
      }

      // Title (h4)
      const title = overlay.querySelector('.recipe-card__title p');
      if (title) {
        const heading = document.createElement('span');
        heading.style.fontWeight = 'bold';
        heading.textContent = title.textContent.trim();
        textContent.appendChild(heading);
        textContent.appendChild(document.createElement('br'));
      }

      // Chef name (footer)
      const chefName = overlay.querySelector('.recipe-card__footer .xps-partner-tag-title');
      if (chefName) {
        const chef = document.createElement('span');
        chef.textContent = chefName.textContent.trim();
        textContent.appendChild(chef);
      }
    }

    // Compose row: [image, textContent]
    const row = [img, textContent];
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
