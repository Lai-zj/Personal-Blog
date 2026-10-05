/**
 * 博客文章浏览/点赞计数 API（Cloudflare Worker）
 *
 * 部署后 API 地址示例：https://api.laizjblog.com
 *
 * 接口：
 *   POST /api/view  {path}  -> {views, likes, liked}  浏览 +1（按 IP 去重，同一访客只计一次）
 *   POST /api/like  {path}  -> {likes, liked}         点赞切换（再点一次取消）
 *   GET  /api/count?path=X  -> {views, likes, liked}  只读查询（调试用）
 *
 * KV 键设计（绑定名 BLOG_COUNTER）：
 *   cnt:<path>            -> JSON {"v": 浏览量, "l": 点赞数}
 *   view:<path>:<ipHash>  -> "1"（该 IP 已计过浏览）
 *   like:<path>:<ipHash>  -> "1"（该 IP 已点赞）
 *
 * 已知限制（个人博客规模无影响）：
 *   - 计数读写非原子，并发极高时可能丢个别计数
 *   - 去重按 IP，同一访客换网络/代理后会再计一次
 */

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
    },
  });
}

// path 只允许以 / 开头的普通路径，防止写入其它 KV 前缀
function cleanPath(p) {
  p = String(p || '').trim().slice(0, 500);
  if (!p.startsWith('/')) p = '/' + p;
  return p === '/' ? '' : p;
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return json({}, 204);

    const url = new URL(request.url);
    let path = '';

    if (url.pathname === '/api/view' || url.pathname === '/api/like') {
      try {
        path = cleanPath((await request.json()).path);
      } catch {
        path = '';
      }
    } else if (url.pathname === '/api/count') {
      path = cleanPath(url.searchParams.get('path') || '');
    } else {
      return json({ error: 'not found' }, 404);
    }
    if (!path) return json({ error: 'path required' }, 400);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const ipHash = await sha256Hex(ip);

    const counterKey = 'cnt:' + path;
    const viewedKey = 'view:' + path + ':' + ipHash;
    const likedKey = 'like:' + path + ':' + ipHash;

    let counter = JSON.parse((await env.BLOG_COUNTER.get(counterKey)) || '{"v":0,"l":0}');
    let changed = false;

    if (url.pathname === '/api/view') {
      // 同一 IP 只计一次浏览
      if (!(await env.BLOG_COUNTER.get(viewedKey))) {
        counter.v += 1;
        await env.BLOG_COUNTER.put(viewedKey, '1');
        changed = true;
      }
    } else if (url.pathname === '/api/like') {
      if (await env.BLOG_COUNTER.get(likedKey)) {
        counter.l = Math.max(0, counter.l - 1);
        await env.BLOG_COUNTER.delete(likedKey);
      } else {
        counter.l += 1;
        await env.BLOG_COUNTER.put(likedKey, '1');
      }
      changed = true;
    }

    if (changed) await env.BLOG_COUNTER.put(counterKey, JSON.stringify(counter));

    const liked = !!(await env.BLOG_COUNTER.get(likedKey));
    return json({ views: counter.v, likes: counter.l, liked }, 200);
  },
};
