// 文章按分类放在 source/_posts/<分类>/ 子目录里，但 URL 保持平铺。
// hexo 默认会把子目录拼进永久链接（例如 /2026/10/04/blog deployment/Markdown语法/），
// 此过滤器在 hexo 内置 post_permalink 过滤器（优先级 10）之后运行，
// 只保留前 3 段（年月日）和最后一段（文件名），去掉中间的目录部分：
//   /2026/10/04/blog deployment/Markdown语法/ -> /2026/10/04/Markdown语法/
// 这样以后把文章移动到其它分类文件夹时 URL 不会变化。
// 注意：此过滤器假定永久链接格式为 :year/:month/:day/:title/。
hexo.extend.filter.register('post_permalink', function(path) {
  if (typeof path !== 'string' || !path) return path;
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 4) {
    return '/' + segments.slice(0, 3).concat(segments[segments.length - 1]).join('/') + '/';
  }
  return path;
}, 20);
