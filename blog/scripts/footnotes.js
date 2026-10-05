// GitHub 风格脚注支持：[^1] ... [^1]: 内容
// hexo-renderer-marked 每次渲染前会清空 marked 默认实例的扩展和 walkTokens，
// 因此这里通过 marked:use 过滤器在渲染时注册 marked-footnote 扩展（含 walkTokens，
// 它会把脚注列表移动到文章末尾）。
const markedFootnote = require('marked-footnote');

hexo.extend.filter.register('marked:use', function(use) {
  use(markedFootnote({
    description: '脚注',
    headingClass: ''
  }));
});
