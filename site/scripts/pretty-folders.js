// For each generated <name>.html (other than index.html), also emit
// <name>/index.html. This aliases the final themed route; page.content only
// contains the markdown body and produces unstyled pretty URLs.

const path = require('path');

hexo.extend.filter.register('after_generate', function () {
  const routes = hexo.route.routes;

  hexo.route.list().forEach((routePath) => {
    if (!routePath.endsWith('.html')) return;
    if (path.basename(routePath) === 'index.html') return;

    const parsed = path.posix.parse(routePath);
    const aliasPath = path.posix.join(parsed.dir, parsed.name, 'index.html');
    const original = routes[routePath];
    if (!original) return;

    hexo.route.set(aliasPath, {
      data: original.data,
      modified: original.modified,
    });
  });
});
