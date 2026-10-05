// 本地测试用：模拟 Cloudflare Worker 计数 API（与 worker.js 行为一致，KV 用内存 Map 代替）
// 运行：node counter-worker/mock.js（监听 8787 端口）
// 用 CF-Connecting-IP 请求头模拟不同访客 IP
const http = require('http');
const crypto = require('crypto');

const store = new Map();
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const json = (res, obj, status = 200) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(obj));
};

http.createServer((req, res) => {
  if (req.method === 'OPTIONS') return json(res, {}, 204);
  const url = new URL(req.url, 'http://localhost');
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    let path = '';
    if (url.pathname === '/api/view' || url.pathname === '/api/like') {
      try { path = JSON.parse(body || '{}').path || ''; } catch (e) { path = ''; }
    } else if (url.pathname === '/api/count') {
      path = url.searchParams.get('path') || '';
    } else {
      return json(res, { error: 'not found' }, 404);
    }
    if (!path) return json(res, { error: 'path required' }, 400);

    const ip = req.headers['cf-connecting-ip'] || '127.0.0.1';
    const ipHash = sha(ip);
    const counterKey = 'cnt:' + path;
    const viewedKey = 'view:' + path + ':' + ipHash;
    const likedKey = 'like:' + path + ':' + ipHash;

    const counter = JSON.parse(store.get(counterKey) || '{"v":0,"l":0}');
    if (url.pathname === '/api/view') {
      if (!store.has(viewedKey)) {
        counter.v += 1;
        store.set(viewedKey, '1');
      }
    } else if (url.pathname === '/api/like') {
      if (store.has(likedKey)) {
        counter.l = Math.max(0, counter.l - 1);
        store.delete(likedKey);
      } else {
        counter.l += 1;
        store.set(likedKey, '1');
      }
    }
    store.set(counterKey, JSON.stringify(counter));
    json(res, { views: counter.v, likes: counter.l, liked: store.has(likedKey) });
  });
}).listen(8787, () => console.log('mock counter API on http://localhost:8787'));
