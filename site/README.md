# terraform-netskope-publisher — docs site

Hexo + Cactus source for the public docs site at
https://johnneerdael.github.io/terraform-netskope-publisher/.

## Local development

```bash
cd site
npm ci            # one-time
npx hexo server   # http://localhost:4000/terraform-netskope-publisher/
```

Edit Markdown under `source/`; the dev server hot-reloads.

## Build

```bash
npx hexo clean && npx hexo generate
```

Output lives in `site/public/`.

## Deploy

Deploy is automatic on push to `main` via `.github/workflows/pages.yml`.
The workflow builds and force-pushes `site/public/` to the `gh-pages`
branch, which GitHub Pages serves.

## Files

- `_config.yml` — site config (URL, theme, version)
- `_config.cactus.yml` — Cactus theme overrides (dark colorscheme, nav)
- `source/` — Markdown content
- `scripts/version-footer.js` — injects the "Applies to v1.x" line
- `package.json` — pinned plugin versions

See `CONTRIBUTING.md` for content conventions.
