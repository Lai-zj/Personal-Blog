# 文章浏览/点赞计数后端（Cloudflare Worker）

前端代码在 `source/js/blog-features.js`，API 地址配置在 `_config.yml` 的 `counter.api`。

## 原理

- 博客是纯静态站点（Hexo + Netlify），计数需要一个极小的后端。
- 用 Cloudflare Worker（免费额度对个人博客绰绰有余：每天 10 万次请求）加 KV 存储。
- 浏览量按 IP 去重：同一访客反复浏览只计一次。
- 点赞按 IP 记录状态：再点一次取消。

## 部署步骤（Cloudflare 控制台，约 5 分钟）

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com)（本博客域名 laizjblog.com 所在账号）。
2. 左侧菜单进入 **Workers & Pages**。
3. 创建 KV 命名空间：
   - 进入 **KV** 标签页 → **Create a namespace**
   - 名称填 `BLOG_COUNTER`，创建
4. 创建 Worker：
   - 回到 **Overview** 标签页 → **Create** → **Create Worker**
   - 名称填 `blog-counter`，点击 **Deploy**（先部署默认代码）
5. 绑定 KV 并粘贴代码：
   - 在 Worker 详情页点 **Edit code**，删掉默认代码，粘贴本目录 `worker.js` 的完整内容
   - 点右侧 **Settings → Variables → KV Namespace Bindings → Add binding**
   - Variable name 填 **`BLOG_COUNTER`**（必须与代码一致），KV namespace 选刚才创建的
   - 点 **Deploy** 保存
6. 绑定自己的域名（可选但推荐）：
   - Worker 详情页 **Settings → Domains & Routes → Add → Custom Domain**
   - 输入 `api.laizjblog.com`，保存（Cloudflare 会自动创建 DNS 记录）
   - 不想配域名的话，也可以用默认的 `https://blog-counter.<你的用户名>.workers.dev`
7. 把 API 地址填进博客根目录 `_config.yml`：
   ```yaml
   counter:
     api: 'https://api.laizjblog.com'   # 或 workers.dev 地址，末尾不要带 /
   ```
8. 重新构建并部署博客（`npm run build` 后 push 到 GitHub，Netlify 会自动发布）。

## 验证

浏览器访问 `https://api.laizjblog.com/api/count?path=/test/`，应返回 JSON：

```json
{"views":0,"likes":0,"liked":false}
```

然后 `curl -X POST https://api.laizjblog.com/api/view -H 'Content-Type: application/json' -d '{"path":"/test/"}'`，views 会变为 1；同一 IP 再 POST 一次仍是 1。

## 已知限制

- 去重按 IP：同一访客换网络后会再计一次。
- KV 读写非原子，极高并发下可能丢个别计数（个人博客规模无影响）。
- 如需重置某篇文章的计数，在 Cloudflare 控制台的 KV 里删掉对应 `cnt:<path>` 键即可。
