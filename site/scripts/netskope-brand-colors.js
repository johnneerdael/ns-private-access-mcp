// Applies Netskope brand colors to the generated theme CSS without modifying
// the vendored Hexo theme in node_modules.

hexo.extend.filter.register('after_render:css', function (str) {
  return str
    .replace(/#ccffb6/gi, '#ff8300')
    .replace(/#2bbc8a/gi, '#00a6ce');
});
