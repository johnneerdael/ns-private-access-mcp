---
title: Validation Tools
date: 2026-05-20
---

Validation tools check naming, resource references, and configuration safety before writes.

| Tool | Use it for |
|------|------------|
| `validateName` | Validate proposed resource names. |
| `validateResource` | Validate existing resource configuration. |

## Safe prompts

```text
Validate the proposed names ams-prod-publisher-01 and crm-prod-web before creating resources. Explain any naming issues.
```

```text
Run a validation pass on production private apps and summarize high-risk configuration issues. Do not remediate yet.
```
