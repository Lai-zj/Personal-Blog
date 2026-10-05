# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo layout

This is a [Hexo](https://hexo.io/) static blog. The git repo root only contains the Hexo site in the `blog/` subdirectory — every command below must be run from `blog/`, not the repo root.

## Commands

All run from `blog/`:

```bash
npm run server   # local dev server (hexo server, http://localhost:4000)
npm run build    # generate static site into blog/public/ (hexo generate)
npm run clean    # delete blog/public/ and the hexo cache db.json
npm run deploy   # hexo deploy — NOT configured yet: deploy.type is empty in _config.yml
```

New posts:

```bash
npx hexo new "Post Title"   # creates source/_posts/<title>.md using scaffolds/post.md
npx hexo new draft "..."    # creates source/_drafts/ (not rendered; render_drafts: false)
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
- `post_asset_folder: false` — no per-post asset folders; images must be referenced from a location under `source/`.
- Math is rendered server-side by `hexo-filter-mathjax` (SVG output, no CDN dependency); posts must set `mathjax: true` in front matter.
