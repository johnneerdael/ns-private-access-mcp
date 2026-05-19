# Contributing to the docs site

## Content conventions

- One topic per file. Long pages discourage updates.
- Every page must have `title:` and `date:` frontmatter.
- Hexo permalink is `:title/`. The filename's slug becomes the URL.
- Internal links must use absolute paths prefixed with the Pages root, such as `/privateaccess-mcp/install/claude-code/`.
- Code blocks must specify the language: `json`, `yaml`, `toml`, `bash`, `text`, or `http`.
- Screenshots belong under `source/images/<section>/`. Use PNG or WebP, max 1600px wide.
- Sensitive values in examples must use placeholders such as `YOUR_NETSKOPE_API_TOKEN`.
- Client configuration pages should cite official platform documentation when they describe platform-specific behavior.

## When package or server behavior changes

Update pages that would otherwise become inaccurate:

- `source/reference/status.md`
- `source/reference/tool-categories.md`
- `source/reference/transport-matrix.md`
- affected install guides under `source/install/`

## Pull request checklist

- [ ] `cd site && npx hexo clean && npx hexo generate` succeeds locally
- [ ] Search finds no stale template references
- [ ] Home, starter, install, operations, and reference pages render locally
- [ ] Client-specific instructions still match current official docs
