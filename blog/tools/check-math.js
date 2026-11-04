#!/usr/bin/env node
'use strict';

// 构建后检查：扫描 public/ 里所有页面，发现 MathJax 渲染错误就退出码 1，
// 让 `npm run build`（以及 Netlify 的构建）在公式坏掉时直接失败，而不是把红框发到线上。
// 常见的 data-mjx-error 原因：
//   - Undefined control sequence \xxx  -> 该宏所在的 TeX 扩展没有在 _config.yml mathjax.packages 里
//   - Unknown environment 'xxx'        -> AMS 环境需要 packages 里有 'ams'

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MAX_LATEX = 160;

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function decode(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function latexBefore(html, index) {
  const start = html.lastIndexOf('data-latex="', index);
  if (start === -1) return '';
  const end = html.indexOf('"', start + 'data-latex="'.length);
  if (end === -1 || end > index) return '';
  return decode(html.slice(start + 'data-latex="'.length, end)).trim();
}

if (!fs.existsSync(PUBLIC_DIR)) {
  console.error(`[check-math] 找不到 ${PUBLIC_DIR}，请先运行 hexo generate。`);
  process.exit(1);
}

const failures = [];
for (const file of walk(PUBLIC_DIR)) {
  const html = fs.readFileSync(file, 'utf8');
  const re = /data-mjx-error="([^"]*)"/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    failures.push({
      file: path.relative(PUBLIC_DIR, file),
      message: decode(m[1]),
      latex: latexBefore(html, m.index)
    });
  }
}

if (failures.length === 0) {
  console.log('[check-math] OK：所有页面的 MathJax 公式均渲染成功。');
  process.exit(0);
}

console.error(`[check-math] 发现 ${failures.length} 处 MathJax 渲染错误：\n`);
const byMessage = new Map();
for (const f of failures) {
  if (!byMessage.has(f.message)) byMessage.set(f.message, []);
  byMessage.get(f.message).push(f);
}
for (const [message, items] of byMessage) {
  console.error(`  ${message}（${items.length} 处）`);
  const shownFiles = new Set();
  for (const item of items) {
    if (shownFiles.size >= 5 && !shownFiles.has(item.file)) continue;
    shownFiles.add(item.file);
    const latex = item.latex.length > MAX_LATEX ? item.latex.slice(0, MAX_LATEX) + '…' : item.latex;
    console.error(`    ${item.file}`);
    if (latex) console.error(`      ${latex}`);
  }
  console.error('');
}
console.error('修复方式：把报错宏所在的 TeX 扩展加进 _config.yml 的 mathjax.packages，再重新构建。');
process.exit(1);
