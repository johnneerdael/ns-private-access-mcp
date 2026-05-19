// Injects styled prev/next navigation at the bottom of pages that
// belong to a linear section defined in source/_data/page-order.yml.
//
// Each section is a list of { url, title } entries. The filter finds
// the current page's URL in any section's list, then emits a nav
// block with prev/next buttons.

const NAV_STYLE = [
  'display:flex',
  'justify-content:space-between',
  'gap:1rem',
  'margin:3rem 0 2rem',
  'padding-top:1.5rem',
  'border-top:1px solid rgba(255,255,255,0.1)',
].join(';');

const BUTTON_STYLE = [
  'flex:1',
  'padding:0.75rem 1rem',
  'border:1px solid rgba(255,255,255,0.2)',
  'border-radius:6px',
  'text-decoration:none',
  'color:inherit',
  'font-size:0.95rem',
  'line-height:1.3',
  'transition:border-color 0.15s',
].join(';');

const LABEL_STYLE = 'opacity:0.6;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.05em;';
const TITLE_STYLE = 'display:block;margin-top:0.25rem;';

function renderNav(prev, next) {
  const parts = [];
  parts.push('<nav class="page-nav" style="' + NAV_STYLE + '">');
  if (prev) {
    parts.push(
      '<a href="' + prev.url + '" style="' + BUTTON_STYLE + '">' +
      '<span style="' + LABEL_STYLE + '">← Previous</span>' +
      '<span style="' + TITLE_STYLE + '">' + prev.title + '</span>' +
      '</a>'
    );
  } else {
    parts.push('<div style="flex:1"></div>');
  }
  if (next) {
    parts.push(
      '<a href="' + next.url + '" style="' + BUTTON_STYLE + ';text-align:right">' +
      '<span style="' + LABEL_STYLE + '">Next →</span>' +
      '<span style="' + TITLE_STYLE + '">' + next.title + '</span>' +
      '</a>'
    );
  } else {
    parts.push('<div style="flex:1"></div>');
  }
  parts.push('</nav>');
  return parts.join('');
}

// Hexo passes { page, layout, config, ... } to after_render filters; the
// page object exposes its output path.
hexo.extend.filter.register('after_render:html', function (str, data) {
  const page = data && data.page;
  if (!page || !page.path || !page.path.endsWith('.html')) return str;

  const pageOrder = hexo.locals.get('data')['page-order'];
  if (!pageOrder) return str;

  // Build the URL we'd look up in page-order.yml. Frontmatter `permalink: :title/`
  // means each .md becomes path/index.html, and our URLs are stored as
  // `/<root>/<dir>/<slug>/`. Strip "index.html" then ensure trailing slash.
  const root = (hexo.config.root || '/').replace(/\/$/, '');
  let urlPath = '/' + page.path.replace(/(?:^|\/)index\.html$/, '/').replace(/\.html$/, '/');
  if (!urlPath.endsWith('/')) urlPath += '/';
  const fullUrl = root + urlPath;

  // Search each section for this URL.
  for (const sectionName of Object.keys(pageOrder)) {
    const pages = pageOrder[sectionName];
    if (!Array.isArray(pages)) continue;
    const idx = pages.findIndex((p) => p.url === fullUrl);
    if (idx === -1) continue;

    const prev = idx > 0 ? pages[idx - 1] : null;
    const next = idx < pages.length - 1 ? pages[idx + 1] : null;
    if (!prev && !next) return str;

    const navHtml = renderNav(prev, next);
    // Inject right before </body>. Filter order means version-footer.js may
    // not have run yet, so we can't anchor on its <footer> element. Both
    // filters target </body>, but the last one to run wraps the previous.
    return str.replace('</body>', navHtml + '</body>');
  }
  return str;
});
