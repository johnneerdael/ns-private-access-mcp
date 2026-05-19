# Netskope NPA MCP docs site

Hexo + Cactus source for the public docs site at
https://johnneerdael.github.io/ns-private-access-mcp/.

## Local development

```bash
cd site
npm ci
npx hexo server
```

The local URL is:

```text
http://localhost:4000/ns-private-access-mcp/
```

Edit Markdown under `source/`; the dev server hot-reloads.

## Build

```bash
npx hexo clean
npx hexo generate
```

Output lives in `site/public/`.

## Deploy

Deploy from the generated static output through GitHub Pages.

## Files

- `_config.yml` - site config, URL, theme, and package version.
- `_config.cactus.yml` - Cactus theme overrides, dark colorscheme, and nav.
- `source/` - Markdown content.
- `scripts/version-footer.js` - injects the "Applies to Netskope NPA MCP" line.
- `package.json` - Hexo and theme dependencies.

See `CONTRIBUTING.md` for content conventions.
