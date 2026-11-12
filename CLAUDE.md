# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

This is a [Hexo](https://hexo.io/) static blog. The git repo root only contains the Hexo site in the `blog/` subdirectory — every command below must be run from `blog/`, not the repo root.

## Commands

All run from `blog/`:

```bash
npm run server   # local dev server (hexo server, http://localhost:4000)
npm run build    # hexo clean && hexo generate, then tools/check-math.js scans blog/public/ and fails on any MathJax render error
npm run check:math  # 只跑公式检查（需已有 blog/public/）
npm run clean    # delete blog/public/ and the hexo cache db.json
npm run deploy   # hexo deploy — NOT configured yet: deploy.type is empty in _config.yml
```

New posts:

```bash
npm run new -- "工程热力学/零碎知识/标题"   # -> source/_posts/工程热力学/零碎知识/标题.md + 同名文件夹
npx hexo new "Post Title"                   # -> source/_posts/<title>.md (根目录，需手动挪进分类目录)
npx hexo new draft "..."                    # creates source/_drafts/ (not rendered; render_drafts: false)
npm run assets                              # 给所有已有文章补建同名资源文件夹
```

There are no tests or linters.

## Content and structure

- **Posts** live in `blog/source/_posts/`, organized in category subfolders (e.g. `source/_posts/工程热力学/工程热力学10-4.md`), written in Chinese (site `language: zh-CN`). Filenames are Chinese and match the post title.
- **URLs stay flat despite subfolders**: `blog/scripts/permalink.js` registers a `post_permalink` filter that strips the subfolder segment, so a post at `_posts/工程热力学/x.md` still gets URL `:year/:month/:day/:title/`. Moving a post between folders never changes its URL.
- **Front matter**: `title`, `date`, `tags` (list), `categories` (list or quoted string), and `mathjax: true` on posts that need math. Scaffolds in `blog/scaffolds/` are templates for `hexo new`.
- **`blog/scripts/`** is auto-loaded by Hexo (plain CommonJS, `hexo.extend.filter.register`):
  - `footnotes.js` — registers `marked-footnote` via the `marked:use` filter for `[^1]` footnotes.
  - `permalink.js` — flat-URL filter described above.
- **Theme**: `landscape` is **vendored into `blog/themes/landscape/`** (copied from the `hexo-theme-landscape` npm package, which is still installed) — local copy takes precedence and is the one edited. The article footer (views/likes UI) is in `themes/landscape/layout/_partial/article.ejs`, global scripts in `_partial/after-footer.ejs`, styles in `source/css/_partial/article.styl`.
- **Views/likes counter**: `source/js/blog-features.js` calls a Cloudflare Worker API (config `counter.api` in `_config.yml`; worker code + deploy docs in `blog/counter-worker/`, plus `counter-worker/mock.js` for local testing on port 8787). Views are deduped by IP server-side; likes toggle. When `counter.api` is empty the UI is not rendered.
- **Config**: `blog/_config.yml` is the active site config. `blog/_config - 副本.yml` is a stale backup copy ("副本" = copy) — do not edit it or treat it as authoritative. `blog/_config.landscape.yml` is the (currently empty) theme-level config overlay.
- Generated output goes to `blog/public/`, which is gitignored along with `node_modules/`, `db.json`, and `.deploy*/`.
- Deployment: the site is served by **Netlify** (laizjblog.com, behind Cloudflare), auto-deployed from GitHub pushes to `main`. There is no CI workflow in the repo itself.
- Dependabot (`blog/.github/dependabot.yml`) updates npm dependencies daily.

## Notable config quirks

- `future: true` — posts dated in the future are still rendered.
- `permalink: :year/:month/:day/:title/` and `new_post_name: :title.md` — file names and URLs derive from titles.
- **Per-post asset folders are enabled**: `post_asset_folder: true` *and* `marked.postAsset: true` in `_config.yml` — both are required. Put images in a folder next to the post file with the same basename as the post (e.g. `source/_posts/高等数学/考研/标题/图.png` for `.../标题.md`) and reference them by bare filename: `![](图.png)`. `hexo new` / `npm run new` create the folder automatically; `npm run assets` backfills folders for existing posts (empty folders aren't tracked by git). Built URL is `<post URL>/图.png`, i.e. flat — `PostAsset.path` is built from `post.path`, which `scripts/permalink.js` has already stripped of the category segments. Do **not** prefix with `/` (that skips the PostAsset lookup entirely) and do not use `../`. Note `hexo g` never creates these folders — it only scans existing ones.
- Math is rendered server-side by `hexo-filter-mathjax` (SVG output, no CDN dependency); posts must set `mathjax: true` in front matter.
- **A literal `{{` anywhere in post content breaks `hexo g`** with `Nunjucks Error: ... expected variable end`: Hexo runs Nunjucks over the rendered HTML, so LaTeX like `\frac{{V_1}^2}{2}` looks like a template variable. Fix by writing `{ {V_1}^2` (the space is ignored in math mode, rendering is identical) or wrapping in `{% raw %}...{% endraw %}`. After editing posts, run `npm run build` to catch this.
- **Markdown escaping eats backslashes inside `$$...$$`** (yes, inside `\begin{}` environments too): `hexo-renderer-marked` strips a backslash whenever it precedes ASCII punctuation, so the LaTeX row separator `\\` must be written as **four** backslashes `\\\\` in the source. Same for `\,` → `\\,`, `\!` → `\\!`, `\{` → `\\{`, `\%` → `\\%`. Backslash + letter (`\sqrt`, `\alpha`) is untouched, so macros are safe. Symptom: MathJax draws a red `Unknown environment '...'` box, or a `cases`/`aligned` block collapses into one row. Grep the built HTML for `data-mjx-error` to check.
- **AMS environments need `packages: ['ams']`**: MathJax 4 (used by `hexo-filter-mathjax` here) does *not* autoload `cases`, `aligned`, `matrix`, `pmatrix`, etc. — without it MathJax renders `Unknown environment 'cases'` in red. `_config.yml` → `mathjax.packages` loads them (note: plain `ams`, not `[tex]/ams`, which fails to resolve; `tags: ams` also works but turns on automatic equation numbering). `array` is base TeX and always works.
- **`\boldsymbol` must be preloaded explicitly**: it lives in the separate `boldsymbol` TeX extension. Do not rely on `autoload` — the local build may load it automatically, but the Netlify build did not, so every `\boldsymbol` on the deployed site rendered `Undefined control sequence \boldsymbol` in red while the local site looked fine. `_config.yml` → `mathjax.packages: ['ams', 'boldsymbol']` fixes it. Any new macro that isn't base TeX needs its package listed the same way; `npm run build` now fails (via `tools/check-math.js`) if any `data-mjx-error` appears in the built HTML.
- **`\tag` is not allowed inside an `aligned` environment**: `\begin{aligned}...\tag{1.8}\end{aligned}` makes MathJax draw a red `\tag not allowed in aligned environment` box and the whole equation is lost. Write `\tag{...}` *after* `\end{aligned}`, still inside the same `$$...$$` block; the number is then placed correctly.
- **Markdown turns `_` subscripts into emphasis, silently destroying a math block.** `hexo-renderer-marked` runs *before* `hexo-filter-mathjax` (which typesets the already-rendered HTML via an `after_post_render` filter), so an underscore following `}` pairs with a later one preceding `{` and the whole paragraph is left as literal text with `<em>` spliced in — it never reaches MathJax. Two triggers, both required: an **opener** (`_` immediately after `}` or `|`, e.g. `\boldsymbol{e}_j` or `|w|_{\max}`) and a later **closer** (`_` preceded by a letter and followed by `{`, e.g. `\sum_{i=1}`); the opener may be inline math on the preceding line, which is one paragraph with the block unless a blank line separates them. Symptom: raw LaTeX printed on the page with **no** red error box, so `data-mjx-error` is absent — grep the built HTML for `<em>` instead. Fix by putting a blank line before the `$$` and dropping the braces at the opener (`\dot{\boldsymbol e_j}` — `\boldsymbol` takes a single token, rendering is identical). For absolute-value subscripts, avoid `|w|_{\max}`; write `w_{\max}` and state that it denotes the maximum absolute value, or put each condition in its own math expression.
- **Blank lines inside `$$...$$` split the block**: `marked` turns the block into several paragraphs with `<br>`, so `hexo-filter-mathjax` never sees a complete `$$...$$` and the raw LaTeX is printed. Leave a blank line *before* and *after* each display block, but none inside (whitespace-only lines count as blank). Symptom: the built HTML contains `<p>$$<br>...` and `data-mjx-error` is absent.
- **A line inside `$$...$$` containing only `=` (or `-`) becomes a setext heading**: `marked` turns the formula into an `<h1>`. Keep the equals sign attached to adjacent content, e.g. write `\end{bmatrix}=` on one line instead of putting a bare `=` on its own line.
- **Chinese inside `\text{}` may not render** in the SVG output (missing glyphs). Use `\mathrm{...}` with Latin labels (`\mathrm{loss}`, `\mathrm{inertia}`) or move the Chinese outside the math.
- **`\ddot{\boldsymbol r}_i` and similar create the `}_` opener**; put the subscript inside the argument instead: `\ddot{\boldsymbol r_i}`. Also, repeated `_{...}` after `\bigg|` (e.g. `\bigg|_{0,\varphi_0}`) can pair as Markdown emphasis even without a `}_` opener; use function-value notation such as `f(0,\varphi_0)` instead.
- **`_` immediately after `]` is also an opener**: `[\sigma]_{\mathrm{st}}` pairs with a later `_{...}` (e.g. `\sigma_{cr}`) in the same paragraph, and adding a space before `_` does not prevent it. Write `\lbrack\sigma\rbrack_{\mathrm{st}}` instead — it renders identically and is safe.
