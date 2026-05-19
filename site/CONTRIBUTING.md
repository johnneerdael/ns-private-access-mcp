# Contributing to the docs site

## Content conventions

- **One topic per file.** Long pages discourage updates.
- **Frontmatter:** every page must have `title:` and `date:`.
- **URLs:** Hexo permalink is `:title/`. The filename's slug becomes the URL.
- **Internal links:** use absolute paths prefixed with the Pages root
  (e.g., `/terraform-netskope-publisher/admin/concepts/registration-flow/`).
- **Code blocks:** always specify the language (`hcl`, `bash`, `pwsh`, `cmd`).
- **Mac vs Windows commands:** use `{% tabs %}` shortcodes (from
  `hexo-tag-tabs`) — see Starter Guide page 02 for an example.
- **Screenshots:** save under `source/images/<section>/`. PNG, max 1600px wide.
- **Callouts:** use blockquote-with-emoji convention. Example:
  > ⚠️ This deletes the publisher from your tenant.
- **Sensitive values in examples:** always use `...` or `<placeholder>`,
  never a real-looking token.

## When provider pins change

If you change a `required_providers` version in any `versions.tf`, update
`source/reference/provider-matrix.md` in the same PR.

## When `CHANGELOG.md` changes

`source/reference/changelog.md` is hand-maintained. Add a matching entry
when you bump the module version.

## Pull request checklist

- [ ] `cd site && npx hexo clean && npx hexo generate` succeeds locally
- [ ] All internal links resolve (browse via `npx hexo server`)
- [ ] Screenshots compressed and under `source/images/`
