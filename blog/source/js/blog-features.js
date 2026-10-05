// 文章浏览 / 点赞计数
// 后端：Cloudflare Worker（见 counter-worker/worker.js，API 地址在 _config.yml 的 counter.api）
//  - 浏览：服务端按 IP 去重，同一访客反复浏览只计一次
//  - 点赞：可切换，再点一次取消
(function () {
  'use strict';

  var API = window.__COUNTER_API__;
  var viewEl = document.querySelector('.counter-views');
  var likeBtn = document.querySelector('.counter-like');
  if (!API || (!viewEl && !likeBtn)) return;

  var path = (likeBtn || viewEl).dataset.path;

  function updateLike(likes, liked) {
    if (!likeBtn) return;
    likeBtn.querySelector('.counter-like-count').textContent = likes;
    likeBtn.classList.toggle('active', !!liked);
    likeBtn.setAttribute('aria-pressed', liked ? 'true' : 'false');
  }

  // 加载时上报一次浏览（服务端按 IP 去重），同时取回浏览/点赞状态
  fetch(API + '/api/view', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: path })
  }).then(function (res) {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }).then(function (data) {
    if (viewEl) viewEl.textContent = data.views;
    updateLike(data.likes, data.liked);
  }).catch(function () {
    // 计数服务不可用时静默降级，不影响页面其它功能
  });

  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      likeBtn.disabled = true;
      fetch(API + '/api/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: path })
      }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      }).then(function (data) {
        updateLike(data.likes, data.liked);
      }).catch(function () {}).finally(function () {
        likeBtn.disabled = false;
      });
    });
  }
})();
