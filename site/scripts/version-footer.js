// Injects an "Applies to terraform-netskope-publisher <module_version>" line
// before </body> on every rendered HTML page. Reads `module_version` from
// _config.yml.

hexo.extend.filter.register('after_render:html', function (str) {
  const version = hexo.config.module_version;
  if (!version) return str;
  const footer =
    '<footer class="version-footer" style="text-align:center; padding:1rem 0; opacity:0.6; font-size:0.85rem;">' +
    'Applies to terraform-netskope-publisher ' + version +
    '</footer>';
  return str.replace('</body>', footer + '</body>');
});
