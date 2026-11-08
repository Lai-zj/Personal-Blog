// 分类侧边栏按课程模块序号排序。
// Hexo 自带的 list_categories 按分类名的 Unicode 顺序排序，中文序号
// “一、二、三……”并不按数值排列（会变成一、三、二、五、六、四）。
// 这里注册一个替代 helper，把以中文序号开头的分类按数值排序，
// 未带序号的分类排在后面，其余保持名称顺序。
const CN_NUM = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
};

function orderKey(name) {
  const match = name.match(/^([一二三四五六七八九十]+)、/);
  if (!match) return 1000;
  const s = match[1];
  if (s === '十') return 10;
  if (s.startsWith('十')) return 10 + (CN_NUM[s[1]] || 0);
  if (s.endsWith('十')) return (CN_NUM[s[0]] || 0) * 10;
  return CN_NUM[s] || 1000;
}

function compare(a, b) {
  const byOrder = orderKey(a.name) - orderKey(b.name);
  if (byOrder !== 0) return byOrder;
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

hexo.extend.helper.register('list_categories_ordered', function(options) {
  const categories = this.site.categories;
  if (!categories || !categories.length) return '';

  const showCount = Object.prototype.hasOwnProperty.call(options || {}, 'show_count')
    ? options.show_count
    : true;
  const urlFor = this.url_for.bind(this);

  function render(parent) {
    const query = parent
      ? categories.find({ parent: parent._id })
      : categories.find({ parent: { $exists: false } });
    const cats = query.toArray().sort(compare);

    return cats.map(function(cat) {
      const child = render(cat);
      let html = '<li class="category-list-item">';
      html += '<a class="category-list-link" href="' + urlFor(cat.path) + '">' + cat.name + '</a>';
      if (showCount) {
        html += '<span class="category-list-count">' + cat.length + '</span>';
      }
      if (child) {
        html += '<ul class="category-list-child">' + child + '</ul>';
      }
      html += '</li>';
      return html;
    }).join('');
  }

  return '<ul class="category-list">' + render(null) + '</ul>';
});
