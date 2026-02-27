// =============================================
// 成果物カードのレンダリング
// =============================================
function renderWorks(works) {
  const grid = document.getElementById('works-grid');
  if (!grid) return;

  if (works.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--toffee);">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">📁</p>
        <p style="font-size: 0.9rem;">まだ成果物がありません</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = works.map((work, i) => {
    const hasImage = work.image && work.image.trim() !== '';
    const hasTags = work.tags && work.tags.length > 0;
    const hasLink = work.link && work.link.trim() !== '' && work.link !== '#';

    const imageHTML = hasImage
      ? `<img src="${escapeHTML(work.image)}" alt="${escapeHTML(work.title)}" loading="lazy">`
      : `<div class="work-card-noimage">
           <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
             <rect x="3" y="3" width="18" height="18" rx="2"/>
             <circle cx="8.5" cy="8.5" r="1.5"/>
             <path d="M21 15l-5-5L5 21"/>
           </svg>
           <span>NO IMAGE</span>
         </div>`;

    const tagsHTML = hasTags
      ? `<div class="work-card-tags">${work.tags.map(t => `<span class="work-tag">${escapeHTML(t)}</span>`).join('')}</div>`
      : '';

    const linkHTML = work.link
      ? `<a href="${escapeHTML(work.link)}" target="_blank" rel="noopener" class="work-card-link">
           View →
         </a>`
      : '';

    return `
      <article class="work-card" style="animation-delay: ${i * 0.05}s">
        <div class="work-card-image">${imageHTML}</div>
        <div class="work-card-body">
          <h3 class="work-card-title">${escapeHTML(work.title)}</h3>
          ${tagsHTML}
          <p class="work-card-desc">${escapeHTML(work.description)}</p>
          <div class="work-card-footer">
            ${linkHTML}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// HTML エスケープ
function escapeHTML(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
